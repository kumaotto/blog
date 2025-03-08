import Head from 'next/head';
import { ContentWrapper } from "components/ContentWrapper";
import Loading from "components/common/Loading/Loading";
import { TableOfContents } from "components/common/TableOfContents/TableOfContents";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { client } from "libs/client";
import { renderToc } from "libs/render-toc";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { Suspense } from "react";
import { MicroCMSArticle } from "types/MicroCmsBlog";
import parse from "html-react-parser";

export const getStaticPaths: GetStaticPaths = async () => {
  const { contents } = await client.get({ endpoint: "blogs" });
  const paths = contents.map((content: MicroCMSArticle) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params?.id;
  const data = await client.get<MicroCMSArticle>({ endpoint: "blogs", contentId: id });
  return {
    props: {
      blog: data,
    },
  };
};

type Props = {
  blog: MicroCMSArticle;
};

const BlogId: NextPage<Props> = ({ blog }: Props) => {
  const publish_date = format(new Date(blog.publishedAt), "yyyy年M月d日", { locale: ja });
  const updated_date = format(new Date(blog.updatedAt), "yyyy年M月d日", { locale: ja });
  const isUpdated = updated_date > publish_date;
  const toc = renderToc(blog.content);

  // OGP用の画像がなければ、デフォルト画像を指定するなどの対応も可能
  const ogImage = blog.eyecatch?.url || "/default-og-image.jpg";
  // 記事概要は blog.summary や blog.description として用意されていると仮定
  const ogDescription = "こまきちのブログ";
  // サイトのドメインは環境に合わせて設定してください
  const ogUrl = `https://your-domain.com/blog/${blog.id}`;

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Your Site Name" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Suspense fallback={<Loading />}>
        <ContentWrapper>
          <main className="mb-20 sm:pt-20 sm:mx-auto sm:flex relative">
            <TableOfContents toc={toc} />
            <div>
              {blog.eyecatch && (
                <img
                  src={blog.eyecatch.url}
                  style={{
                    width: "70%",
                    maxWidth: "100%",
                    height: "auto",
                    margin: "0 auto",
                  }}
                  alt="ブログアイキャッチ画像"
                />
              )}
              <h1 className="text-4xl mt-5 mb-2 sm:mb-0">{blog.title}</h1>
              <div className="sm:flex sm:mt-2 text-neutral-500">
                <p className="mr-4">公開日: {publish_date}</p>
                {isUpdated && <p>更新日: {updated_date}</p>}
              </div>
              <p className="mt-2 border-2 w-fit px-2 py-0.5 text-xs">
                {blog.category?.name}
              </p>
              <article className="prose prose-indigo mx-auto my-0">
                {parse(blog.content)}
              </article>
            </div>
          </main>
        </ContentWrapper>
      </Suspense>
    </>
  );
};

export default BlogId;

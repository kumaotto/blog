import { ContentWrapper } from "components/ContentWrapper";
import Loading from "components/common/Loading/Loading";
import { TableOfContents } from "components/common/TableOfContents/TableOfContents";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { client } from "libs/client";
import { renderToc } from "libs/render-toc";
import { GetStaticPaths, GetStaticProps, Metadata, NextPage } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { Suspense } from "react";
import { MicroCMSArticle } from "types/MicroCmsBlog";
import parse, { DOMNode, Element } from "html-react-parser";
import Head from "next/head";

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

/**
 * Speaker Deck（Embedly経由）の <iframe> をレスポンシブ対応に置き換えるための関数
 */
function transformEmbedlySpeakerDeck(node: DOMNode) {
  if (node instanceof Element && node.name === "iframe") {
    // 例: class="embedly-embed" や src="https://cdn.embedly.com/..." をチェック
    const hasEmbedlyClass = node.attribs.class?.includes("embedly-embed");
    const src = node.attribs.src || "";
    const title = node.attribs.title || "";

    // Speaker Deck の埋め込みかどうかを判定
    //  - 例: src に 'speakerdeck.com/player' が含まれているか
    //  - あるいは class="embedly-embed" で判定
    if (hasEmbedlyClass && title.includes("Speaker Deck embed")) {
      // レスポンシブ対応した JSX を返す
      return (
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={src}
            allowFullScreen
            title="Speaker Deck (Embedly)"
          />
        </div>
      );
    }
  }

  // 該当しなければ何も返さない（= そのまま表示）
  return undefined;
}

const BlogId: NextPage<Props> = ({ blog }: Props) => {
  const publish_date = format(new Date(blog.publishedAt), "yyyy年M月d日", { locale: ja });
  const updated_date = format(new Date(blog.updatedAt), "yyyy年M月d日", { locale: ja });
  const isUpdated = updated_date > publish_date;
  const toc = renderToc(blog.content);

  const ogImageUrl = `https://kumaotto.com/api/og?title=${encodeURIComponent(blog.title)}`;

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta property="og:title" content={blog.title} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:description" content='こまきちのブログ' />
        <meta property="og:url" content={`https://kumaotto.com/blog/${blog.id}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>komakichi | {blog.title}</title>
      </Head>
      <Suspense fallback={<Loading />}>
        <ContentWrapper>
          <main className="mb-20 sm:pt-20 sm:mx-auto sm:flex relative">
            <TableOfContents toc={toc} />
            <div className="prose mx-auto my-0">
              {blog.eyecatch && (
                <img
                  src={blog.eyecatch.url}
                  alt="ブログアイキャッチ画像"
                />
              )}
              <div>
                <h1 className="text-4xl mt-5 mb-2 sm:mb-0">{blog.title}</h1>
                <div className="sm:flex sm:mt-2 text-neutral-500">
                  <p className="mr-4">公開日: {publish_date}</p>
                  {isUpdated && <p>更新日: {updated_date}</p>}
                </div>
                <p className="mt-2 border-2 w-fit px-2 py-0.5 text-xs">
                  {blog.category?.name}
                </p>
              </div>
              <article className="prose-indigo mx-auto my-0">
                {/* ここで transformEmbedlySpeakerDeck を適用 */}
                {parse(blog.content, { replace: transformEmbedlySpeakerDeck })}
              </article>
            </div>
          </main>
        </ContentWrapper>
      </Suspense>
    </>
  );
};

export default BlogId;

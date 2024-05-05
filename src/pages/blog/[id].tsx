import { ContentWrapper } from "components/ContentWrapper";
import Loading from "components/common/Loading/Loading";
import { TableOfContents } from "components/common/TableOfContents/TableOfContents";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { client } from "libs/client";
import { renderToc } from "libs/render-toc";
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";
import { Suspense } from "react";
import { MicroCMSArticle } from "types/MicroCmsBlog";

export const getStaticPaths: GetStaticPaths = async () => {
  const { contents } = await client.get({ endpoint: "blogs" });

  const paths = contents.map((content: MicroCMSArticle) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
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

const BlogId: NextPage<Props> = ({
  blog,
}: Props) => {
  
  const publish_date: string = format(new Date(blog.publishedAt), 'yyyy年M月d日', {locale: ja})
  const updated_date: string = format(new Date(blog.updatedAt), 'yyyy年M月d日', {locale: ja})
  
  const isUpdated: boolean = updated_date > publish_date;

  const toc = renderToc(blog.content);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ContentWrapper>
          <main className="mb-20 sm:pt-20 sm:mx-auto sm:flex relative">
            <TableOfContents toc={toc} />
            <div className="">
              {blog.eyecatch &&
                <img
                  src={blog.eyecatch.url}
                  className=""
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                  alt="ブログアイキャッチ画像"
                />
              }
              <h1 className="text-4xl mt-5 mb-2 sm:mb-0">{blog.title}</h1>
              <div className="sm:flex sm:mt-2 text-neutral-500">
                <p className="mr-4">公開日: {publish_date}</p>
                {isUpdated &&
                  <p>更新日: {updated_date}</p>
                }
              </div>
              <p className="mt-2 border-2 w-fit px-2 py-0.5 text-xs">
                {blog.category?.name}
              </p>

              <div
                className="blogContent mt-5"
                dangerouslySetInnerHTML={{
                  __html: `${blog.content}`,
                }}
              />
            </div>
          </main>
        </ContentWrapper>
      </Suspense>
    </>
  );
};

export default BlogId;
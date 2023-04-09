import { ContentWrapper } from "components/ContentWrapper";
import Header from "components/header/Header";
import { client } from "libs/client";
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
  InferGetStaticPropsType,
} from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Article } from "types/blog";

export const getStaticPaths: GetStaticPaths = async () => {
  const { contents } = await client.get({ endpoint: "blogs" });

  const paths = contents.map((content: Article) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const id = context.params?.id;
  const data = await client.get<Article>({ endpoint: "blogs", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

type Props = {
  blog: Article;
};

const BlogId: NextPage<Props> = ({
  blog,
}: Props) => {
  return (
    <>
      <Header />
      <ContentWrapper>
        <main>
          <h1 className="text-4xl mt-10">{blog.title}</h1>
          <p className="mt-2">{blog.publishedAt}</p>
          <p className="mt-2 border-2 w-fit px-2 py-0.5 text-xs">
            {blog.category.name}
          </p>

          <div
            className="mt-5"
            dangerouslySetInnerHTML={{
              __html: `${blog.content}`,
            }}
          />
        </main>
      </ContentWrapper>
    </>
  );
};

export default BlogId;

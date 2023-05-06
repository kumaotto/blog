import { ContentWrapper } from "components/ContentWrapper";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { client } from "libs/client";
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
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
  const isUpdated = blog.updatedAt > blog.publishedAt
  return (
    <>
      <ContentWrapper>
        <main className="mb-20">
          <h1 className="text-4xl mt-10">{blog.title}</h1>
          <div className="flex mt-2">
            <p className="mr-4">公開日: {format(new Date(blog.publishedAt), 'yyyy年M月d日', {locale: ja})}</p>
            {isUpdated &&
              <p>更新日: {format(new Date(blog.updatedAt), 'yyyy年M月d日', {locale: ja})}</p>
            }
          </div>
          <p className="mt-2 border-2 w-fit px-2 py-0.5 text-xs">
            {blog.category.name}
          </p>

          <div
            className="blogContent mt-5"
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

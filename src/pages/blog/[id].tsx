import { client } from "libs/client";
import {
    GetStaticPaths, GetStaticProps, NextPage, InferGetStaticPropsType,
} from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Blog } from "types/blog";

export const getStaticPaths: GetStaticPaths = async () => {
	const { contents } = await client.get({endpoint: "blogs"});
	
	const paths = contents.map((content: Blog) => `/blog/${content.id}`);
	return { paths, fallback: false};
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
	const id = context.params?.id;
	const data = await client.get({endpoint: "blogs", contentId: id})

	return {
		props: {
			blog: data
		}
	}
};

type Props = {
	blog: Blog;
};

const BlogId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	blog,
}: Props) => {
	return (
		<main>
			<h1>{blog.title}</h1>
			<p>{blog.publishedAt}</p>
			<p>{blog.category.name}</p>
			
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.content}`,
        }}
      />
		</main>
	)
}

export default BlogId;
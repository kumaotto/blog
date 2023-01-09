import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { client } from "libs/client";
import { Article, Category } from "types/blog";
import Link from "next/link";
import { Avatar } from "components/image/Avatar";
import Header from "components/header/Header";
import { ContentWrapper } from "components/ContentWrapper";

type Props = {
  blogs: Article[];
  categories: Category[];
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
  categories,
}: Props) => {
  return (
    <>
      <Header />
      <ContentWrapper>
        <div className="text-center pt-8">
          <h1 className="text-4xl mb-4 font-bold text-gray-800">kumaotto</h1>
          <Avatar />
          <h2 className="text-2xl font-bold text-gray-800 mt-10 text-left">
            Articles
          </h2>
          <ul className="mt-4">
            {blogs.map((blog) => (
              <li key={blog.id} className="rounded-md border-2 py-2.5">
                <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </ContentWrapper>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: "blogs" });
  const category = await client.get({ endpoint: "categories" });

  return {
    props: {
      blogs: blog.contents,
      categories: category.contents,
    },
  };
};

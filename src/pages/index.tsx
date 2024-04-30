import type { InferGetStaticPropsType, NextPage } from "next";
import { client } from "libs/client";
import { Article, Category } from "types/blog";
import Link from "next/link";
import { Avatar } from "components/image/Avatar";
import { ContentWrapper } from "components/ContentWrapper";
import { Suspense } from "react";
import Loading from "components/common/Loading/Loading";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import React from "react";

type Props = {
  blogs: Article[];
  categories: Category[];
};

const Home = ({
  blogs,
  categories,
}: Props) => {
  return (
    <>
      <ContentWrapper>
        <div className="text-center pt-8">
          <h1 className="text-4xl mb-4 font-bold text-gray-800">kumaotto</h1>
          <Avatar/>
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mt-10 text-left">
              Articles
            </h2>
            <Suspense fallback={<Loading />}>
              <ul className="mt-4">
                {blogs.map((blog) => (
                  <li key={blog.id} className="rounded-md border-2 py-2.5 mb-2">
                    <Link href={`/blog/${blog.id}`}>
                      <div className="text-left pl-3 sm:flex sm:items-center sm:justify-start sm:pl-5">
                        <p className="pr-7 text-neutral-500">{format(new Date(blog.publishedAt), 'yyyy年M月d日', {locale: ja})}</p>
                        <p>{blog.title}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Suspense>
          </div>
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

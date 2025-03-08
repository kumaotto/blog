import Link from "next/link";
import { Avatar } from "components/image/Avatar";
import { TopContentWrapper } from "components/TopContentWrapper";
import { Suspense } from "react";
import Loading from "components/common/Loading/Loading";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import React from "react";
import { getCmsBlogAndNormalized, getQiitaBlogAndNormalized, getZennBlogAndNormalized } from "../libs/client";
import { CommonArticle } from "types/CommonBlog";

type Props = {
  blogs: any[];
};

export const metadata = {
  openGraph: {
    title: "ペンギンブログ",
    description:
      "ペンギンブログは、世界中のペンギンの生態、特徴、驚くべき行動を紹介するブログです。ペンギン好きにはたまらない情報が満載！",
    images: [{
      url: "/ogp.png", // 🌟 静的画像の指定
      width: 1200,
      height: 630
    }],
  },
};

export default function Home({
  blogs,
}: Props) {

  const setIconImage = (icon: string) => {
    switch (icon) {
      case 'zenn':
        return '/images/zenn.svg';
      case 'microcms':
        return '/images/book.svg';
      case 'qiita':
        return '/images/qiita.svg';
      default:
        return '/vercel.svg';
    }
  }

  const setLinkPath = (blog: CommonArticle) => {
    switch (blog.icon) {
      case 'zenn':
        return `https://zenn.dev/kumao/articles/${blog.path}`;
      case 'microcms':
        return blog.path;
      case 'qiita':
        return blog.path;
      default:
        return '/';
    }
  }

  return (
    <>
      <TopContentWrapper>
        <div className="text-center pt-8">
          <h1 className="text-4xl mb-4 font-bold text-gray-800">kumaotto</h1>
          <Avatar/>
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mt-10 text-left">
              Articles
            </h2>
            <Suspense fallback={<Loading />}>
              <ul className="mt-4">
                {blogs && blogs.map((blog) => (
                  <li key={blog.id} className="rounded-md border-2 py-2.5 mb-2">
                    <Link href={setLinkPath(blog)}>
                      <div className="text-left pl-3 sm:flex sm:items-center sm:justify-start sm:pl-5">
                        <img src={setIconImage(blog.icon)} className="w-6 h-6 sm:mr-3" alt="icon"/>
                        <p className="pr-7 text-neutral-500">{format(new Date(blog.publishedAt), 'yyyy/MM/dd', {locale: ja})}</p>
                        <p>{blog.title}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Suspense>
          </div>
        </div>
      </TopContentWrapper>
    </>
  );
};

export const getStaticProps = async () => {
  const [cmsArticles, zennArticles, qiitaArticles] = await Promise.all([
    getCmsBlogAndNormalized(),
    getZennBlogAndNormalized(),
    getQiitaBlogAndNormalized(),
  ]);
  const articles = [...cmsArticles, ...zennArticles, ...qiitaArticles];
  
  // 最新7件を表示
  articles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  const latestArticles = articles.slice(0, 7);

  return {
    props: {
      blogs: latestArticles.map(article => ({
        ...article,
        publishedAt: article.publishedAt.toISOString(),
      })),
    },
  };
};

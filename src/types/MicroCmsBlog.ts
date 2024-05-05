import { CommonArticle } from "./CommonBlog";

export type MicroCMSArticle = {
  id: string;
  content: string;
  title: string;
  category: MicroCMSCategory;
  image: string;
  eyecatch: {
    "url": string,
    "height": number,
    "width": number
  };
  body: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type MicroCMSArticles = {
  contents: MicroCMSArticle[];
};

export type MicroCMSCategory = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export function normalizeCmsArticle(article: MicroCMSArticle): CommonArticle {
  return {
    id: `cms-${String(article.id)}`,
    title: article.title,
    icon: "microcms",
    path: `/blog/${String(article.id)}`,
    publishedAt: new Date(article.publishedAt),
  };
}

import { createClient } from "microcms-js-sdk";
import { normalizeZennArticle, ZennArticle } from "../types/ZennBlog";
import { CommonArticle, PlatformIcon } from "../types/CommonBlog";
import { MicroCMSArticle, MicroCMSArticles, normalizeCmsArticle } from "types/MicroCmsBlog";
import { normalizeQiitaArticle, QiitaArticle } from "types/QiitaBlog";

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || "",
  apiKey: process.env.API_KEY || "",
});

export const getMicroCMSBlog: () => Promise<MicroCMSArticle[]> = async () => {
  const blogs: MicroCMSArticles = await client.get({ endpoint: "blogs" });
  return blogs.contents;
}

export const getZennBlog: () => Promise<ZennArticle[]> = async () => {
  const res = await fetch("https://zenn.dev/api/articles?username=kumao&order=latest");
  const data = await res.json();
  return data.articles;
}

export const getQiitaBlog: () => Promise<QiitaArticle[]> = async () => {
  const res = await fetch("https://qiita.com/api/v2/items?page=1&per_page=10&query=Kumaou_00");
  const data = await res.json();
  return data;
}

export const getCmsBlogAndNormalized: () => Promise<CommonArticle[]> = async () => {
  const cmsArticles = await getMicroCMSBlog();
  const normalizedArticles = cmsArticles.map(article => ({
    ...normalizeCmsArticle(article),
    icon: "microcms" as PlatformIcon,
  }));
  return normalizedArticles;
}

export const getZennBlogAndNormalized: () => Promise<CommonArticle[]> = async () => {
  const zennArticles = await getZennBlog();
  const normalizedArticles = zennArticles.map(article => ({
    ...normalizeZennArticle(article),
    icon: "zenn" as PlatformIcon,
  }));
  return normalizedArticles;
}

export const getQiitaBlogAndNormalized: () => Promise<CommonArticle[]> = async () => {
  const qiitaArticles = await getQiitaBlog();
  const normalizedArticles = qiitaArticles.map(article => ({
    ...normalizeQiitaArticle(article),
    icon: "qiita" as PlatformIcon,
  }));
  return normalizedArticles;
}

import { createClient } from "microcms-js-sdk";
import { normalizeZennArticle, ZennArticle } from "../types/ZennBlog";
import { CommonArticle, PlatformIcon } from "../types/CommonBlog";
import { MicroCMSArticle, MicroCMSArticles, normalizeCmsArticle } from "types/MicroCmsBlog";

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

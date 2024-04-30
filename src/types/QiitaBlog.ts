import { CommonArticle } from "./CommonBlog";

export type QiitaArticle = {
  rendered_body: string,
  body: string,
  comments_count: number,
  created_at: Date,
  id: string,
  likes_count: number,
  private: boolean,
  stocks_count: number,
  tag: {
    name: string,
    versions: string[]
  },
  updated_at: Date,
  url: string,
  title: string,
  user: {
    description: string,
    facebook_id: string,
    followees_count: number,
    followers_count: number,
    github_login_name: string,
    id: string,
    items_count: number,
    linkedin_id: string,
    location: string,
    name: string,
    organization: string,
    permanent_id: number,
    profile_image_url: string,
    team_only: boolean,
    twitter_screen_name: string,
    website_url: string,
  },
  page_views_count: null | number,
  slide: boolean,
}

export function normalizeQiitaArticle(article: QiitaArticle): CommonArticle {
  return {
    id: `qiita-${String(article.id)}`,
    title: article.title,
    icon: "qiita",
    path: article.url,
    publishedAt: new Date(article.created_at), // QiitaにはpublishedAtがないのでcreated_atを使う
  };
}

import { CommonArticle } from "./CommonBlog";

export type ZennArticle = {
  id: number,
  post_type: "Article"
  title: string,
  slug: string,
  comments_count: number,
  liked_count: number,
  body_letters_count: number,
  article_type: "tech",
  emoji: string,
  is_suspending_private: boolean,
  published_at: Date,
  body_updated_at: Date,
  source_repo_updated_at:	null,
  pinned:	boolean,
  path: string,
  user: {
    id: number,
    username: string,
    name: string,
    avatar_small_url: string
  },
  publication: null
}

export function normalizeZennArticle(article: ZennArticle): CommonArticle {
  return {
    id: `zenn-${String(article.id)}`,
    title: article.title,
    icon: "zenn",
    path: article.slug,
    publishedAt: new Date(article.published_at),
  };
}

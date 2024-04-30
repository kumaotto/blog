export type PlatformIcon = "zenn" | "microcms" | "qiita";

export type CommonArticle = {
  id: string;
  title: string;
  icon: PlatformIcon;
  path: string;
  publishedAt: Date;
};

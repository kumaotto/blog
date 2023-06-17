export type Article = {
  id: string;
  content: string;
  title: string;
  category: Category;
  image: string;
  eyecatch: {
    "url": string,
    "height": number,
    "width": number
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

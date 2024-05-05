import * as cheerio from 'cheerio';

export const renderToc = (body: string): any => {
  const $ = cheerio.load(body);
  const headings = $('h1, h2, h3').toArray();
  const toc: any = headings.map((data: any) => ({
    text: data.children[0].data,
    id: data.attribs.id
  }));

  return toc;
};
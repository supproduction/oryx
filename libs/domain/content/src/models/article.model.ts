// TODO: create dynamic types and dependable dynamic pages.
export const articleTypes = ['article', 'faq', 'about'];

export interface ArticleContent {
  heading: string;
  description: string;
  content: string;
  type: string;
}

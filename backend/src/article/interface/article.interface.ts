export interface IArticle {
  id: string;
  title: string;
  content: string;
  status: ArticleStatus;
}

export enum ArticleStatus {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  CANCEL = 'CANCEL',
}

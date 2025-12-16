import { Injectable } from '@nestjs/common';
import { IArticle } from './interface/article.interface';
import { createArticleDto } from './dto/create-article.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ArticleService {
  //resource
  private readonly article: IArticle[] = [];

  createArticle(createArticleDto: createArticleDto) {
    const article: IArticle = {
      id: randomUUID(),
      ...createArticleDto,
    };
    this.article.push(article);
    return article;
  }

  findAllArticle(): IArticle[] {
    return this.article;
  }
}

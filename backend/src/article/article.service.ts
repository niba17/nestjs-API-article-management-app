import { UpdateArticleDto } from './dto/update-article.dto';
import { Injectable } from '@nestjs/common';
import { IArticle } from './interface/article.interface';
import { createArticleDto } from './dto/create-article.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ArticleService {
  //resource
  private article: IArticle[] = [];

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

  findOneByParams(id: string): IArticle | undefined {
    return this.article.find((item) => item.id === id);
  }

  updateArticleByParams(
    article: IArticle,
    UpdateArticleDto: UpdateArticleDto,
  ): IArticle {
    Object.assign(article, UpdateArticleDto);
    return article;
  }

  deleteArticleByParams(articleData: IArticle): void {
    this.article = this.article.filter(
      (filterData) => filterData.id !== articleData.id,
    );
  }
}

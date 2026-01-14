import { UpdateArticleDto } from './dto/update-article.dto';
import { Injectable } from '@nestjs/common';
import { IArticle } from './interface/article.interface';
import { createArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticleService {
  //resource
  constructor(
    @InjectRepository(Article)
    private ArticleRepository: Repository<Article>,
  ) {}

  async createArticle(createArticleDto: createArticleDto): Promise<Article> {
    const newArticle = await this.ArticleRepository.save(createArticleDto);
    return newArticle;
  }

  async findAllArticle(): Promise<Article[]> {
    return await this.ArticleRepository.find();
  }

  async findOneByParams(id: string): Promise<Article | null> {
    return await this.ArticleRepository.findOne({ where: { id } });
  }

  async updateArticleByParams(
    article: IArticle,
    UpdateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    Object.assign(article, UpdateArticleDto);
    return await this.ArticleRepository.save(article);
  }

  async deleteArticleByParams(articleData: IArticle): Promise<void> {
    await this.ArticleRepository.delete(articleData.id);
  }
}

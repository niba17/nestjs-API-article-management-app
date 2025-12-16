import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { createArticleDto } from './dto/create-article.dto';
import type { IArticle } from './interface/article.interface';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll(): IArticle[] {
    return this.articleService.findAllArticle();
  }

  @Get('/:id')
  findOne(@Param() params: any): string {
    return `Tampil detail Article ${params.id}`;
  }

  @Post()
  create(@Body() createArticleDto: createArticleDto): IArticle {
    return this.articleService.createArticle(createArticleDto);
  }

  @Put('/:id')
  update(@Param() params: any): string {
    return `Update Article ${params.id}`;
  }

  @Delete('/:id')
  delete(@Param() params: any): string {
    return `Delete Article ${params.id}`;
  }
}

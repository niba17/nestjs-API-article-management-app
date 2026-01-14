import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { createArticleDto } from './dto/create-article.dto';
import { FindOneParams } from './dto/find-one.params';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return await this.articleService.findAllArticle();
  }

  @Get('/:id')
  async findOne(@Param() params: FindOneParams): Promise<Article> {
    return await this.findOneOrFail(params.id);
  }

  @Post()
  async create(@Body() createArticleDto: createArticleDto): Promise<Article> {
    return await this.articleService.createArticle(createArticleDto);
  }

  @Put('/:id')
  async update(
    @Param() params: FindOneParams,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.findOneOrFail(params.id);
    return await this.articleService.updateArticleByParams(
      article,
      updateArticleDto,
    );
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params: FindOneParams): Promise<void> {
    const article = await this.findOneOrFail(params.id);
    await this.articleService.deleteArticleByParams(article);
  }

  private async findOneOrFail(id: string): Promise<Article> {
    const article = await this.articleService.findOneByParams(id);
    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }
}

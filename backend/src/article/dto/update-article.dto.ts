import { PartialType } from '@nestjs/mapped-types';
import { createArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(createArticleDto) {}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleStatus } from '../interface/article.interface';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.PENDING,
  })
  status: ArticleStatus;

  @CreateDateColumn()
  readonly createAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}

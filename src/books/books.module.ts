import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Books } from './models/book.model';

@Module({
  imports: [SequelizeModule.forFeature([Books])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}

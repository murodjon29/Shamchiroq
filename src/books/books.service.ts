import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Books } from './models/book.model';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { handleError } from 'src/helpers/responseError';
import { successRes } from 'src/helpers/success-response';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Books) private model: typeof Books) {}

  async create(createBookDto: CreateBookDto): Promise<object> {
    try {
      const book = await this.model.create({ ...createBookDto });
      return successRes(book, 201);
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll(): Promise<object> {
    try {
      const books = await this.model.findAll({ include: { all: true } });
      return successRes(books);
    } catch (error) {
      return handleError(error);
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const book = await this.model.findByPk(id, {
        include: { all: true },
      });
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return successRes(book);
    } catch (error) {
      return handleError(error);
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<object> {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('Book not found');
      }

      const book = await this.model.update(updateBookDto, {
        where: { id },
        returning: true,
      });
      return successRes(book[1][0]);
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('Book not found');
      }

      await this.model.destroy({ where: { id } });
      return successRes({ message: 'Deleted Succeessfuly' });
    } catch (error) {
      return handleError(error);
    }
  }
}

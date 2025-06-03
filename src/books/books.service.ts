import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Books } from './models/book.model';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { handleError } from 'src/helpers/responseError';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Books) private model: typeof Books) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const book = await this.model.create({ ...createBookDto });
      return { statusCode: 201, message: 'Success', data: book };
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll() {
    try {
      const books = await this.model.findAll({ include: { all: true } });
      return { statusCode: 200, message: 'Success', data: books };
    } catch (error) {
      return handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const book = await this.model.findByPk(id, {
        include: { all: true },
      });
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return { statusCode: 200, message: 'Success', data: book };
    } catch (error) {
      return handleError(error);
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('Book not found');
      }

      const book = await this.model.update(updateBookDto, {
        where: { id },
        returning: true,
      });
      return { statusCode: 200, message: 'Success', data: book[1][0] };
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('Book not found');
      }

      await this.model.destroy({ where: { id } });
      return { statusCode: 200, message: 'Success', data: {} };
    } catch (error) {
      return handleError(error);
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {Lessons} from './models/lesson.model'
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { handleError } from 'src/utils/responseError';

@Injectable()
export class LessonService {
  constructor(@InjectModel(Lessons) private model: typeof Lessons) {}

  async create(createLessonDto: CreateLessonDto) {
    try {
      const lesson = await this.model.create(createLessonDto as any);
      return { statusCode: 201, message: 'Success', data: lesson };
    } catch (error) {
      return handleError(error);
    }
  }


  async findAll() {
    try {
      const lessons = await this.model.findAll({ include: { all: true } });
      return { statusCode: 200, message: 'Success', data: lessons };
    } catch (error) {
      return handleError(error);
    }
  }
  

  async findOne(id: number) {
    try {
      const lesson = await this.model.findByPk(id, { include: { all: true } });
      if (!lesson) {
        throw new NotFoundException('lesson not found');
      }
      return { statusCode: 200, message: 'Success', data: lesson };
    } catch (error) {
      return handleError(error);
    }
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('lesson not found');
      }

      const lesson = await this.model.update(updateLessonDto, { where: { id },returning: true,
      });
      return { statusCode: 200, message: 'Success', data: lesson[1][0] };
    } catch (error) {
      return handleError(error);
    }
  }

   async remove(id: number) {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('lesson not found');
      }

      await this.model.destroy({ where: { id } });
      return { statusCode: 200, message: 'Success', data: {} };
    } catch (error) {
      return handleError(error);
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lessons } from './models/lesson.model';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { handleError } from 'src/helpers/responseError';
import { successRes } from 'src/helpers/success-response';

@Injectable()
export class LessonService {
  constructor(@InjectModel(Lessons) private model: typeof Lessons) {}

  async create(createLessonDto: CreateLessonDto): Promise<object> {
    try {
      const lesson = await this.model.create(createLessonDto as any);
      return successRes(lesson, 201);
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll(): Promise<object> {
    try {
      const lessons = await this.model.findAll({ include: { all: true } });
      return successRes(lessons);
    } catch (error) {
      return handleError(error);
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const lesson = await this.model.findByPk(id, { include: { all: true } });
      if (!lesson) {
        throw new NotFoundException('lesson not found');
      }
      return successRes(lesson);
    } catch (error) {
      return handleError(error);
    }
  }

  async update(id: number, updateLessonDto: UpdateLessonDto): Promise<object> {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('lesson not found');
      }

      const lesson = await this.model.update(updateLessonDto, {
        where: { id },
        returning: true,
      });
      return successRes(lesson[1][0]);
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('lesson not found');
      }

      await this.model.destroy({ where: { id } });
      return successRes({ message: 'Deleted successfully' });
    } catch (error) {
      return handleError(error);
    }
  }
}

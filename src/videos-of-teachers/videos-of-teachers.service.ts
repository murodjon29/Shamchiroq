import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideosOfTeacherDto } from './dto/create-videos-of-teacher.dto';
import { UpdateVideosOfTeacherDto } from './dto/update-videos-of-teacher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Videos_of_teachers } from './models/videos-of-teacher.model';
import { handleError } from 'src/utils/responseError';

@Injectable()
export class VideosOfTeachersService {
  constructor(@InjectModel(Videos_of_teachers) private model: typeof Videos_of_teachers) { }

  async create(createVideosOfTeacherDto: CreateVideosOfTeacherDto) {
    try {
      const videos_of_teachers = await this.model.create({ ...createVideosOfTeacherDto })
      return { statusCode: 201, message: "Success", data: videos_of_teachers }
    } catch (error) {
      handleError(error)
    }
  }

  async findAll() {
    try {
      const videos_of_teachers = await this.model.findAll({ include: { all: true } })
      return { statusCode: 200, message: "Success", data: videos_of_teachers }
    } catch (error) {
      handleError(error)
    }
  }

  async findOne(id: number) {
    try {
      const videos_of_teachers = await this.model.findByPk(id, { include: { all: true } })
      if (!videos_of_teachers) {
        throw new NotFoundException()
      }
      return { statusCode: 200, message: "Success", data: videos_of_teachers }
    } catch (error) {
      handleError(error)
    }
  }

  async update(id: number, updateVideosOfTeacherDto: UpdateVideosOfTeacherDto) {
    try {
      if (!await this.model.findByPk(id)) {
        throw new NotFoundException()
      }
      const videos_of_teachers = await this.model.update(updateVideosOfTeacherDto, { where: { id }, returning: true })
      return { statusCode: 200, message: "Success", data: videos_of_teachers }
    } catch (error) {
      handleError(error)
    }
  }

  async remove(id: number) {
    try {
      if (!await this.model.findByPk(id)) {
        throw new NotFoundException()
      }
      const videos_of_teachers = await this.model.destroy({ where: { id } })
      return { statusCode: 200, message: "Success", data: {} }
    } catch (error) {
      handleError(error)
    }
  }
}

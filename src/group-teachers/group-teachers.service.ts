import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupTeacherDto } from './dto/create-group-teacher.dto';
import { UpdateGroupTeacherDto } from './dto/update-group-teacher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Groups_teachers } from './models/group-teacher.models';
import { handleError } from 'src/helpers/responseError';

@Injectable()
export class GroupTeachersService {
  constructor(@InjectModel(Groups_teachers) private model: typeof Groups_teachers) { }

  async create(createGroupTeacherDto: CreateGroupTeacherDto) {
    try {
      const groupTeacher = await this.model.create({ ...createGroupTeacherDto })
      return { statusCode: 201, message: "Success", data: groupTeacher }
    } catch (error) {
      handleError(error)
    }
  }

  async findAll() {
    try {
      const groupTeachers = await this.model.findAll({ include: { all: true } })
      return { statusCode: 200, message: "Success", data: groupTeachers }
    } catch (error) {
      handleError(error)
    }
  }

  async findOne(id: number) {
    try {
      const groupTeacher = await this.model.findByPk(id, { include: { all: true } })
      if (!groupTeacher) {
        throw new NotFoundException()
      }
      return { statusCode: 200, message: "Success", data: groupTeacher }
    } catch (error) {
      handleError(error)
    }
  }

  async update(id: number, updateGroupTeacherDto: UpdateGroupTeacherDto) {
    try {
      if (!await this.model.findByPk(id)) {
        throw new NotFoundException()
      }
      const groupTeacher = await this.model.update(updateGroupTeacherDto, { where: { id }, returning: true })
      return { statusCode: 200, message: "Success", data: groupTeacher[1][0] }
    } catch (error) {
      handleError(error)
    }
  }

  async remove(id: number) {
    try {
      if (!await this.model.findByPk(id)) {
        throw new NotFoundException()
      }
      await this.model.destroy({ where: { id } })
    } catch (error) {
      handleError(error)
    }
  }
}

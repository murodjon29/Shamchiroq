import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Teachers } from './models/teacher.model';
import { encrypt } from 'src/utils/encrypt-decrypt';
import { handleError } from 'src/utils/responseError';

@Injectable()
export class TeachersService {
  constructor(@InjectModel(Teachers) private model: typeof Teachers) { }
  async create(createTeacherDto: CreateTeacherDto) {
    try {
      const { full_name, email, password, specialist } = createTeacherDto;
      const hashedPassword = await encrypt(password)
      const teacher = await this.model.create({ full_name, email, password: hashedPassword, specialist })
      return { statusCode: 201, message: "Success", data: teacher }
    } catch (error) {
      return handleError(error)
    }
  }

  async findAll() {
    try {
      const teachers = await this.model.findAll({ include: { all: true } })
      return { statusCode: 200, message: "Success", data: teachers }
    } catch (error) {
      handleError(error)
    }
  }

  async findOne(id: number) {
    try {
      const teacher = await this.model.findByPk(id, { include: { all: true } })
      if (!teacher) {
        throw new NotFoundException("Teacher not found")
      }
      return { statusCode: 200, message: "Success", data: teacher }
    } catch (error) {
      handleError(error)
    }
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    try {
      if (!await this.model.findByPk(id)) {
        throw new NotFoundException("Teacher not found")
      }
      const teacher = await this.model.update(updateTeacherDto, { where: { id }, returning: true })
      return { statusCode: 200, message: "Success", data: teacher[1][0] }
    } catch (error) {
      handleError(error)
    }
  }

  async remove(id: number) {
    try {
      if (!await this.model.findByPk(id)) {
        throw new NotFoundException("Teacher not found")
      }
      await this.model.destroy({ where: { id } })
      return { statusCode: 200, message: "Success", data: {} }
    } catch (error) {
      handleError(error)
    }
  }
}

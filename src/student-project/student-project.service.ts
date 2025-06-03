import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Students_projects } from './model/student-project.entity';
import { CreateStudentProjectDto } from './dto/create-student-project.dto';
import { UpdateStudentProjectDto } from './dto/update-student-project.dto';
import { handleError } from 'src/helpers/responseError';

@Injectable()
export class StudentProjectService {
  constructor(
    @InjectModel(Students_projects)
    private studentProjectModel: typeof Students_projects,
  ) { }

  async create(createStudentProjectDto: CreateStudentProjectDto): Promise<object> {
    try {
      const studentProject = await this.studentProjectModel.create({ ...createStudentProjectDto })
      return { statusCode: 201, message: "Success", data: studentProject }
    } catch (error) {
      return handleError(error)
    }
  }

  async findAll(): Promise<object> {
    try {
      const studentProject = await this.studentProjectModel.findAll({ include: { all: true } })
      return { statusCode: 200, message: "Success", data: studentProject }
    } catch (error) {
      return handleError(error)
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const studentProject = await this.studentProjectModel.findByPk(id, {
        include: ['student', 'project'],
      });
      if (!studentProject) {
        throw new Error('Student-Project relation not found');
      }
      return { statusCode: 200, message: "Success", data: studentProject }
    } catch (error) {
      return handleError(error)
    }
  }

  async update(id: number, updateStudentProjectDto: UpdateStudentProjectDto): Promise<object> {
    try {
      if (!await this.studentProjectModel.findByPk(id)) throw new NotFoundException()
      const studentProject = await this.studentProjectModel.update(updateStudentProjectDto, { where: { id }, returning: true })
      return { statusCode: 200, message: "Success", data: studentProject[1][0] }

    } catch (error) {
      return handleError(error)
    }
  }

  async remove(id: number): Promise<object> {
    try {
      if (!await this.studentProjectModel.findByPk(id)) throw new NotFoundException()
      await this.studentProjectModel.destroy({ where: { id } })
      return { statusCode: 200, message: "Success", data: {} }

    } catch (error) {
      return handleError(error)
    }
  }
}
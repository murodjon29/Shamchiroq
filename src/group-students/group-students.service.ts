import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group_students } from './models/group-student.model';
import { CreateGroupStudentDto } from './dto/create-group-student.dto';
import { UpdateGroupStudentDto } from './dto/update-group-student.dto';
import { handleError } from 'src/helpers/responseError';

@Injectable()
export class GroupStudentsService {
  constructor(
    @InjectModel(Group_students)
    private groupStudentModel: typeof Group_students,
  ) { }

  async create(createGroupStudentDto: CreateGroupStudentDto): Promise<object> {
    try {
      const group_student = this.groupStudentModel.create({ ...createGroupStudentDto })
      return { statusCode: 201, message: "Success", data: group_student }
    } catch (error) {

      return handleError(error);
    }
  }

  async findAll(): Promise<object> {
    try {
      const group_student = await this.groupStudentModel.findAll({ include: { all: true } })
      return { statusCode: 201, message: "Success", data: group_student }
    } catch (error) {
      return handleError(error)
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const group_student = await this.groupStudentModel.findByPk(id, {
        include: { all: true }
      });
      if (!group_student) {
        throw new Error('Group-Student relation not found');
      }
      return { statusCode: 201, message: "Success", data: group_student }

    } catch (error) {
      return handleError(error)
    }

  }

  async update(id: number, updateGroupStudentDto: UpdateGroupStudentDto): Promise<object> {
    try {
      if (!await this.groupStudentModel.findByPk(id)) {
        throw new NotFoundException()
      }
      const group_student = await this.groupStudentModel.update(updateGroupStudentDto, { where: { id }, returning: true })
      return { statusCode: 201, message: "Success", data: group_student }

    } catch (error) {
      return handleError(error)
    }
  }

  async remove(id: number): Promise<object> {
    try {
      if (!await this.groupStudentModel.findByPk(id)) {
        throw new NotFoundException()
      }
      await this.groupStudentModel.destroy({ where: { id } })
      return { statusCode: 201, message: "Success", data: {} }
    } catch (error) {
      return handleError(error)
    }
  }
}
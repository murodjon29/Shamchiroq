import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group_students } from './models/group-student.model';
import { CreateGroupStudentDto } from './dto/create-group-student.dto';
import { UpdateGroupStudentDto } from './dto/update-group-student.dto';
import { handleError } from 'src/helpers/responseError';
import { successRes } from 'src/helpers/success-response';

@Injectable()
export class GroupStudentsService {
  constructor(
    @InjectModel(Group_students)
    private groupStudentModel: typeof Group_students,
  ) {}

  async create(createGroupStudentDto: CreateGroupStudentDto): Promise<object> {
    try {
      const group_student = this.groupStudentModel.create({
        ...createGroupStudentDto,
      });
      return successRes(group_student, 201);
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll(): Promise<object> {
    try {
      const group_student = await this.groupStudentModel.findAll({
        include: { all: true },
      });
      return successRes(group_student);
    } catch (error) {
      return handleError(error);
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const group_student = await this.groupStudentModel.findByPk(id, {
        include: { all: true },
      });
      if (!group_student) {
        throw new NotFoundException('Group-Student relation not found');
      }
      return successRes(group_student);
    } catch (error) {
      return handleError(error);
    }
  }

  async update(
    id: number,
    updateGroupStudentDto: UpdateGroupStudentDto,
  ): Promise<object> {
    try {
      if (!(await this.groupStudentModel.findByPk(id))) {
        throw new NotFoundException();
      }
      const group_student = await this.groupStudentModel.update(
        updateGroupStudentDto,
        { where: { id }, returning: true },
      );
      return successRes(group_student);
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      if (!(await this.groupStudentModel.findByPk(id))) {
        throw new NotFoundException();
      }
      await this.groupStudentModel.destroy({ where: { id } });
      return successRes({ message: 'Delted succesfuly' });
    } catch (error) {
      return handleError(error);
    }
  }
}

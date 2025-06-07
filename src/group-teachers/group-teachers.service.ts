import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupTeacherDto } from './dto/create-group-teacher.dto';
import { UpdateGroupTeacherDto } from './dto/update-group-teacher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Groups_teachers } from './models/group-teacher.models';
import { handleError } from 'src/helpers/responseError';
import { successRes } from 'src/helpers/success-response';

@Injectable()
export class GroupTeachersService {
  constructor(
    @InjectModel(Groups_teachers) private model: typeof Groups_teachers,
  ) {}

  async create(createGroupTeacherDto: CreateGroupTeacherDto): Promise<object> {
    try {
      const groupTeacher = await this.model.create({
        ...createGroupTeacherDto,
      });
      return successRes(groupTeacher, 201);
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll(): Promise<object> {
    try {
      const groupTeachers = await this.model.findAll({
        include: { all: true },
      });
      return successRes(groupTeachers);
    } catch (error) {
      return handleError(error);
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const groupTeacher = await this.model.findByPk(id, {
        include: { all: true },
      });
      if (!groupTeacher) {
        throw new NotFoundException();
      }
      return successRes(groupTeacher);
    } catch (error) {
      return handleError(error);
    }
  }

  async update(
    id: number,
    updateGroupTeacherDto: UpdateGroupTeacherDto,
  ): Promise<object> {
    try {
      if (!(await this.model.findByPk(id))) {
        throw new NotFoundException();
      }
      const groupTeacher = await this.model.update(updateGroupTeacherDto, {
        where: { id },
        returning: true,
      });
      return successRes(groupTeacher[1][0]);
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      if (!(await this.model.findByPk(id))) {
        throw new NotFoundException();
      }
      await this.model.destroy({ where: { id } });
      return successRes({ message: 'Deleted Succesfully' });
    } catch (error) {
      return handleError(error);
    }
  }
}

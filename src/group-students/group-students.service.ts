import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group_students } from './models/group-student.model';
import { CreateGroupStudentDto } from './dto/create-group-student.dto';
import { UpdateGroupStudentDto } from './dto/update-group-student.dto';

@Injectable()
export class GroupStudentsService {
  constructor(
    @InjectModel(Group_students)
    private groupStudentModel: typeof Group_students,
  ) { }

  async create(createGroupStudentDto: CreateGroupStudentDto): Promise<Group_students> {
    return this.groupStudentModel.create(createGroupStudentDto);
  }

  async findAll(): Promise<Group_students[]> {
    return this.groupStudentModel.findAll({
      include: ['group', 'student'],
    });
  }

  async findOne(id: number): Promise<Group_students> {
    const groupStudent = await this.groupStudentModel.findByPk(id, {
      include: ['group', 'student'],
    });
    if (!groupStudent) {
      throw new Error('Group-Student relation not found');
    }
    return groupStudent;
  }

  async update(id: number, updateGroupStudentDto: UpdateGroupStudentDto): Promise<Group_students> {
    const groupStudent = await this.findOne(id);
    return groupStudent.update(updateGroupStudentDto);
  }

  async remove(id: number): Promise<void> {
    const groupStudent = await this.findOne(id);
    await groupStudent.destroy();
  }
}
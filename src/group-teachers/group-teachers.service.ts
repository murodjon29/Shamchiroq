import { Injectable } from '@nestjs/common';
import { CreateGroupTeacherDto } from './dto/create-group-teacher.dto';
import { UpdateGroupTeacherDto } from './dto/update-group-teacher.dto';

@Injectable()
export class GroupTeachersService {
  create(createGroupTeacherDto: CreateGroupTeacherDto) {
    return 'This action adds a new groupTeacher';
  }

  findAll() {
    return `This action returns all groupTeachers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupTeacher`;
  }

  update(id: number, updateGroupTeacherDto: UpdateGroupTeacherDto) {
    return `This action updates a #${id} groupTeacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupTeacher`;
  }
}

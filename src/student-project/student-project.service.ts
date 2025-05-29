import { Injectable } from '@nestjs/common';
import { CreateStudentProjectDto } from './dto/create-student-project.dto';
import { UpdateStudentProjectDto } from './dto/update-student-project.dto';

@Injectable()
export class StudentProjectService {
  create(createStudentProjectDto: CreateStudentProjectDto) {
    return 'This action adds a new studentProject';
  }

  findAll() {
    return `This action returns all studentProject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentProject`;
  }

  update(id: number, updateStudentProjectDto: UpdateStudentProjectDto) {
    return `This action updates a #${id} studentProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentProject`;
  }
}

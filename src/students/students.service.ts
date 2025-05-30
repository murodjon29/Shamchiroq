import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Students } from './models/student.model';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Students)
    private studentModel: typeof Students,
  ) { }

  async create(createStudentDto: CreateStudentDto): Promise<Students> {
    return this.studentModel.create(createStudentDto);
  }

  async findAll(): Promise<Students[]> {
    return this.studentModel.findAll({
      include: ['projects', 'group_students'],
    });
  }

  async findOne(id: number): Promise<Students> {
    return this.studentModel.findByPk(id, {
      include: ['projects', 'group_students'],
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Students> {
    const student = await this.findOne(id);
    if (!student) {
      throw new Error('Student not found');
    }
    return student.update(updateStudentDto);
  }

  async remove(id: number): Promise<void> {
    const student = await this.findOne(id);
    if (!student) {
      throw new Error('Student not found');
    }
    await student.destroy();
  }
}
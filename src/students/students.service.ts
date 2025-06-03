import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Students } from './models/student.model';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { handleError } from 'src/helpers/responseError';
import { decrypt, encrypt } from 'src/helpers/encrypt-decrypt';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Students)
    private studentModel: typeof Students,
  ) { }

  async create(createStudentDto: CreateStudentDto): Promise<Object | any> {
    try {
      const { password } = createStudentDto
      const hashedPassword = await encrypt(password)
      const student = await this.studentModel.create({ ...createStudentDto, password: hashedPassword })
      return { statusCode: 201, message: "Success", data: student }
    } catch (error) {
      return handleError(error)
    }
  }

  async findAll(): Promise<Object | any> {
    try {
      const student = await this.studentModel.findAll({ include: { all: true } })
      return { statusCode: 200, message: "Success", data: student }
    } catch (error) {
      return handleError(error)
    }
  }

  async findOne(id: number): Promise<Object | null> {
    try {
      const student = await this.studentModel.findByPk(id, {
        include: { all: true },
      });

      if(!student) {
        throw new NotFoundException("")
      }
      return {statusCode: 200, message: "Success", data: student}
    } catch (error) {
      return handleError(error)
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<object> {
    if (!await this.studentModel.findByPk(id)) {
      throw new Error('Student not found');
    }
    const student = await this.studentModel.update(updateStudentDto, { where: { id }, returning: true });
    return {statusCode: 200, message: "success", date: student[1][0]};
  }

  async remove(id: number) {
    try {
      if (!await this.studentModel.findByPk(id)) {
        throw new NotFoundException("Sudent not found")
      }
      await this.studentModel.destroy({ where: { id } })
      return { statusCode: 200, message: "Success", data: {} }
    } catch (error) {
      handleError(error)
    }
  }
}
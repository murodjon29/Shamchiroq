import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Students } from './models/student.model';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { handleError } from 'src/helpers/responseError';
import { decrypt, encrypt } from 'src/helpers/encrypt-decrypt';
import { successRes } from 'src/helpers/success-response';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Students)
    private studentModel: typeof Students,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Object | any> {
    try {
      const { password } = createStudentDto;
      const hashedPassword = await encrypt(password);
      const student = await this.studentModel.create({
        ...createStudentDto,
        password: hashedPassword,
      });
      return successRes(student, 201);
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll(): Promise<Object | any> {
    try {
      const student = await this.studentModel.findAll({
        include: { all: true },
      });
      return successRes(student);
    } catch (error) {
      return handleError(error);
    }
  }

  async findOne(id: number): Promise<Object | null> {
    try {
      const student = await this.studentModel.findByPk(id, {
        include: { all: true },
      });

      if (!student) {
        throw new NotFoundException('');
      }
      return successRes(student);
    } catch (error) {
      return handleError(error);
    }
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<object> {
    try {
      if (!(await this.studentModel.findByPk(id))) {
        throw new Error('Student not found');
      }
      const student = await this.studentModel.update(updateStudentDto, {
        where: { id },
        returning: true,
      });
      return successRes(student[1][0]);
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      if (!(await this.studentModel.findByPk(id))) {
        throw new NotFoundException('Sudent not found');
      }
      await this.studentModel.destroy({ where: { id } });
      return successRes({ message: 'Deleted successfully' });
    } catch (error) {
      return handleError(error);
    }
  }
}

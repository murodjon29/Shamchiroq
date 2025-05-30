import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Students_projects } from './model/student-project.entity';
import { CreateStudentProjectDto } from './dto/create-student-project.dto';
import { UpdateStudentProjectDto } from './dto/update-student-project.dto';

@Injectable()
export class StudentProjectService {
  constructor(
    @InjectModel(Students_projects)
    private studentProjectModel: typeof Students_projects,
  ) { }

  async create(createStudentProjectDto: CreateStudentProjectDto): Promise<Students_projects> {
    return this.studentProjectModel.create(createStudentProjectDto);
  }

  async findAll(): Promise<Students_projects[]> {
    return this.studentProjectModel.findAll({
      include: ['student', 'project'],
    });
  }

  async findOne(id: number): Promise<Students_projects> {
    const studentProject = await this.studentProjectModel.findByPk(id, {
      include: ['student', 'project'],
    });
    if (!studentProject) {
      throw new Error('Student-Project relation not found');
    }
    return studentProject;
  }

  async update(id: number, updateStudentProjectDto: UpdateStudentProjectDto): Promise<Students_projects> {
    const studentProject = await this.findOne(id);
    return studentProject.update(updateStudentProjectDto);
  }

  async remove(id: number): Promise<void> {
    const studentProject = await this.findOne(id);
    await studentProject.destroy();
  }
}
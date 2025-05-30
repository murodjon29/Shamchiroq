import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Students } from './models/student.model';
import { Group_students } from 'src/group-students/models/group-student.model';
import { Projects } from 'src/projects/models/project.model';
import { Students_projects } from 'src/student-project/model/student-project.entity';

@Module({
  imports: [SequelizeModule.forFeature([Students, Group_students, Projects, Students_projects])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule { }

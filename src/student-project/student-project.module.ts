import { Module } from '@nestjs/common';
import { StudentProjectService } from './student-project.service';
import { StudentProjectController } from './student-project.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Students_projects } from './model/student-project.entity';
import { Students } from 'src/students/models/student.model';
import { Projects } from 'src/projects/models/project.model';

@Module({
  imports: [SequelizeModule.forFeature([Students_projects, Students, Projects])],
  controllers: [StudentProjectController],
  providers: [StudentProjectService],
})
export class StudentProjectModule { }

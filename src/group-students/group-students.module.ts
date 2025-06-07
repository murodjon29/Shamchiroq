import { Module } from '@nestjs/common';
import { GroupStudentsService } from './group-students.service';
import { GroupStudentsController } from './group-students.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group_students } from './models/group-student.model';
import { Groups } from 'src/groups/models/group.model';
import { Students } from 'src/students/models/student.model';

@Module({
  imports: [SequelizeModule.forFeature([Group_students, Groups, Students])],
  controllers: [GroupStudentsController],
  providers: [GroupStudentsService],
})
export class GroupStudentsModule {}

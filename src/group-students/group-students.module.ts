import { Module } from '@nestjs/common';
import { GroupStudentsService } from './group-students.service';
import { GroupStudentsController } from './group-students.controller';

@Module({
  controllers: [GroupStudentsController],
  providers: [GroupStudentsService],
})
export class GroupStudentsModule {}

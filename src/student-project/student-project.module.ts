import { Module } from '@nestjs/common';
import { StudentProjectService } from './student-project.service';
import { StudentProjectController } from './student-project.controller';

@Module({
  controllers: [StudentProjectController],
  providers: [StudentProjectService],
})
export class StudentProjectModule {}

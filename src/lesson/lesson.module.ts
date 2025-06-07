import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lessons } from './models/lesson.model';

@Module({
  imports: [SequelizeModule.forFeature([Lessons])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}

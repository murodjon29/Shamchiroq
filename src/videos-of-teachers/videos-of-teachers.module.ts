import { Module } from '@nestjs/common';
import { VideosOfTeachersService } from './videos-of-teachers.service';
import { VideosOfTeachersController } from './videos-of-teachers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Videos_of_teachers } from './models/videos-of-teacher.model';

@Module({
  imports: [SequelizeModule.forFeature([Videos_of_teachers])],
  controllers: [VideosOfTeachersController],
  providers: [VideosOfTeachersService],
})
export class VideosOfTeachersModule { }

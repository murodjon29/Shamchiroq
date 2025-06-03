import { Module } from '@nestjs/common';
import { VideosOfTeachersService } from './videos-of-teachers.service';
import { VideosOfTeachersController } from './videos-of-teachers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Videos_of_teachers } from './models/videos-of-teacher.model';
import { FileService } from 'src/file/file.service';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [SequelizeModule.forFeature([Videos_of_teachers]), FileModule],
  controllers: [VideosOfTeachersController],
  providers: [VideosOfTeachersService, FileService],
})
export class VideosOfTeachersModule { }

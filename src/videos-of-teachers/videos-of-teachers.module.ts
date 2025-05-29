import { Module } from '@nestjs/common';
import { VideosOfTeachersService } from './videos-of-teachers.service';
import { VideosOfTeachersController } from './videos-of-teachers.controller';

@Module({
  controllers: [VideosOfTeachersController],
  providers: [VideosOfTeachersService],
})
export class VideosOfTeachersModule {}

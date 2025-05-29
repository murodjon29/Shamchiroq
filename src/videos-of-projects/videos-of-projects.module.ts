import { Module } from '@nestjs/common';
import { VideosOfProjectsService } from './videos-of-projects.service';
import { VideosOfProjectsController } from './videos-of-projects.controller';

@Module({
  controllers: [VideosOfProjectsController],
  providers: [VideosOfProjectsService],
})
export class VideosOfProjectsModule {}

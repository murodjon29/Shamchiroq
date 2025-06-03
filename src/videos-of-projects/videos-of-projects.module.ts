import { Module } from '@nestjs/common';
import { VideosOfProjectsService } from './videos-of-projects.service';
import { VideosOfProjectsController } from './videos-of-projects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Videos_of_project } from './models/videos-of-project.model';
import { FileService } from 'src/file/file.service';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [SequelizeModule.forFeature([Videos_of_project]), FileModule],
  controllers: [VideosOfProjectsController],
  providers: [VideosOfProjectsService, FileService],
})
export class VideosOfProjectsModule {}

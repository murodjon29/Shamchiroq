import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Projects } from './models/project.model';
import { Videos_of_project } from './models/videos-of-project.model';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Projects, Videos_of_project]),
    FileModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}

import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Projects } from './models/project.model';

@Module({
  imports: [SequelizeModule.forFeature([Projects])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}

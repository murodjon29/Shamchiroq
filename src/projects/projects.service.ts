import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Projects } from './models/project.model';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { handleError } from 'src/helpers/responseError';
import { successRes } from 'src/helpers/success-response';
import { Videos_of_project } from './models/videos-of-project.model';
import { FileService } from 'src/file/file.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Projects) private model: typeof Projects,
    @InjectModel(Videos_of_project)
    private videosModel: typeof Videos_of_project,
    private readonly fileService: FileService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(
    createProjectDto: CreateProjectDto,
    files?: Express.Multer.File[],
  ) {
    const transaction = await this.sequelize.transaction();
    try {
      const project = await this.model.create(
        { ...createProjectDto },
        { transaction },

      );
      if (files && files.length > 0) {
        const videoUrls: string[] = [];
        for (let video of files) {
          videoUrls.push(await this.fileService.createFile(video));
        }
        const videos = videoUrls.map((video: string) => {
          return { video_url: video, project_id: project.dataValues.id };
        });
        await this.videosModel.bulkCreate(videos, { transaction });
        await transaction.commit();
        const findProject = await this.model.findOne({
          where: { name: project.dataValues.name },
          include: { all: true },
        });
        return successRes(findProject, 201);
      }
    } catch (error) {
      await transaction.rollback();
      return handleError(error);
    }
  }

  async findAll() {
    try {
      const projects = await this.model.findAll({ include: { all: true } });
      return successRes(projects);
    } catch (error) {
      return handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const project = await this.model.findByPk(id, { include: { all: true } });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return successRes(project);
    } catch (error) {
      return handleError(error);
    }
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
    file?: Express.Multer.File[]
  ): Promise<object> {
    const transaction = await this.sequelize.transaction();
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('Project not found');
      }
      const videos = await this.videosModel.findAll( {where: { project_id: id }, transaction });      
      if(videos && videos.length > 0) {

        for (let video of videos) {
          if(video.dataValues.video_url  && (await this.fileService.existFile(video.dataValues.video_url))) {
            await this.fileService.deleteFile(video.dataValues.video_url);
          }
        }
        await this.videosModel.destroy({ where: { project_id: id }, transaction }); 
      }
      await this.model.update(updateProjectDto, { where: { id } }), { transaction };
      if (file && file.length > 0) {
        const videoUrls: string[] = [];
        for (let video of file) {
          videoUrls.push(await this.fileService.createFile(video));
        }
        const videos = videoUrls.map((video: string) => {
          return { video_url: video, project_id: id };
        });
        
        await this.videosModel.bulkCreate(videos, { transaction });
      }
      await transaction.commit();
      const updatedProject = await this.model.findByPk(id, {
        include: { all: true },
      });
      if(!updatedProject) {
        throw new NotFoundException('Project not found after update');
      }
      return successRes(updatedProject);
    } catch (error) {
      await transaction.rollback();
      return handleError(error);
    }
  }

async delete(projectId: number) {
  const transaction = await this.sequelize.transaction();
  try {
    const project = await this.model.findByPk(projectId, {
      include: { model: this.videosModel, all: true },
      transaction,
    });
    if (!project) {
      throw new Error('Project not found');
    }
    if (project.dataValues.Videos && project.dataValues.Videos.length > 0) {
      const videoIds = project.dataValues.Videos.map((video: any) => video.id);
      
      await this.videosModel.destroy({ where: { id: videoIds }, transaction });
      for (let video of project.dataValues.Videos) {
        await this.fileService.deleteFile(video.dataValues.video_url);
      }
    }
    await this.model.destroy({ where: { id: projectId }, transaction });
    await transaction.commit();
    return successRes({ message: 'Project deleted successfully' }, 200);
  } catch (error) {
    await transaction.rollback();
    return handleError(error);
  }
}
}

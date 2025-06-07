import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Videos_of_project } from './models/videos-of-project.model';
import { CreateVideosOfProjectDto } from './dto/create-videos-of-project.dto';
import { UpdateVideosOfProjectDto } from './dto/update-videos-of-project.dto';
import { Projects } from 'src/projects/models/project.model';
import { handleError } from 'src/helpers/responseError';
import { FileService } from 'src/file/file.service';
import { successRes } from 'src/helpers/success-response';

@Injectable()
export class VideosOfProjectsService {
  constructor(
    @InjectModel(Videos_of_project) private model: typeof Videos_of_project,
    private readonly fileService: FileService,
  ) {}

  async create(
    createProjectDto: CreateVideosOfProjectDto,
    file?: Express.Multer.File,
  ): Promise<object> {
    try {
      let video: undefined | string;
      if (file) {
        video = await this.fileService.createFile(file);
      }
      const Videos_of_project = await this.model.create({
        ...createProjectDto,
        video_url: video,
      });
      return successRes(Videos_of_project, 201);
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll(): Promise<object> {
    try {
      const videos = await this.model.findAll({ include: { model: Projects } });
      return successRes(videos);
    } catch (error) {
      return handleError(error);
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const video = await this.model.findByPk(id, {
        include: { model: Projects },
      });
      if (!video) {
        throw new NotFoundException('Video not found');
      }
      return successRes(video);
    } catch (error) {
      return handleError(error);
    }
  }

  async update(
    id: number,
    updateVideoDto: UpdateVideosOfProjectDto,
    file: Express.Multer.File | undefined,
  ): Promise<object> {
    try {
      const videos_of_project = await this.model.findByPk(id);
      let video = videos_of_project?.video_url;
      if (file) {
        if (video && (await this.fileService.existFile(video))) {
          await this.fileService.deleteFile(video);
        }
        video = await this.fileService.createFile(file);
      }
      const updateVideo = await this.model.update(
        { ...updateVideoDto, video },
        { where: { id }, returning: true },
      );
      return successRes(updateVideo);
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('Video not found');
      }
      if (
        found.video_url &&
        (await this.fileService.existFile(found.video_url))
      ) {
        await this.fileService.deleteFile(found.video_url);
      }
      await this.model.destroy({ where: { id } });
      return successRes({ message: 'Videos of projects deleted successfuly' });
    } catch (error) {
      return handleError(error);
    }
  }
}

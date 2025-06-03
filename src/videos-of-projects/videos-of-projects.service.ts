import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Videos_of_project } from './models/videos-of-project.model';
import { CreateVideosOfProjectDto } from './dto/create-videos-of-project.dto';
import { UpdateVideosOfProjectDto } from './dto/update-videos-of-project.dto';
import { Projects } from 'src/projects/models/project.model';
import { handleError } from 'src/helpers/responseError';

@Injectable()
export class VideosOfProjectsService {
  constructor(
    @InjectModel(Videos_of_project) private model: typeof Videos_of_project,
  ) { }

  async create(createVideoDto: CreateVideosOfProjectDto, file?: Express.Multer.File | undefined) {
    try {
      const video = await this.model.create({ ...createVideoDto });
      return { statusCode: 201, message: 'Success', data: video };
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll() {
    try {
      const videos = await this.model.findAll({ include: { model: Projects } });
      return { statusCode: 200, message: 'Success', data: videos };
    } catch (error) {
      return handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const video = await this.model.findByPk(id, {
        include: { model: Projects },
      });
      if (!video) {
        throw new NotFoundException('Video not found');
      }
      return { statusCode: 200, message: 'Success', data: video };
    } catch (error) {
      return handleError(error);
    }
  }

  async update(id: number, updateVideoDto: UpdateVideosOfProjectDto) {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('Video not found');
      }
      const video = await this.model.update(updateVideoDto, {
        where: { id },
        returning: true,
      });
      return { statusCode: 200, message: 'Success', data: video[1][0] };
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const found = await this.model.findByPk(id);
      if (!found) {
        throw new NotFoundException('Video not found');
      }
      await this.model.destroy({ where: { id } });
      return { statusCode: 200, message: 'Success', data: {} };
    } catch (error) {
      return handleError(error);
    }
  }
}

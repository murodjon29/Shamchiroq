import { Injectable } from '@nestjs/common';
import { CreateVideosOfProjectDto } from './dto/create-videos-of-project.dto';
import { UpdateVideosOfProjectDto } from './dto/update-videos-of-project.dto';

@Injectable()
export class VideosOfProjectsService {
  create(createVideosOfProjectDto: CreateVideosOfProjectDto) {
    return 'This action adds a new videosOfProject';
  }

  findAll() {
    return `This action returns all videosOfProjects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} videosOfProject`;
  }

  update(id: number, updateVideosOfProjectDto: UpdateVideosOfProjectDto) {
    return `This action updates a #${id} videosOfProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} videosOfProject`;
  }
}

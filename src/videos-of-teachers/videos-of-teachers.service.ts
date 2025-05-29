import { Injectable } from '@nestjs/common';
import { CreateVideosOfTeacherDto } from './dto/create-videos-of-teacher.dto';
import { UpdateVideosOfTeacherDto } from './dto/update-videos-of-teacher.dto';

@Injectable()
export class VideosOfTeachersService {
  create(createVideosOfTeacherDto: CreateVideosOfTeacherDto) {
    return 'This action adds a new videosOfTeacher';
  }

  findAll() {
    return `This action returns all videosOfTeachers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} videosOfTeacher`;
  }

  update(id: number, updateVideosOfTeacherDto: UpdateVideosOfTeacherDto) {
    return `This action updates a #${id} videosOfTeacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} videosOfTeacher`;
  }
}

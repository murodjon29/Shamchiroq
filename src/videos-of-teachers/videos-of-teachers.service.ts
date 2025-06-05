import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideosOfTeacherDto } from './dto/create-videos-of-teacher.dto';
import { UpdateVideosOfTeacherDto } from './dto/update-videos-of-teacher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Videos_of_teachers } from './models/videos-of-teacher.model';
import { handleError } from 'src/helpers/responseError';
import { FileService } from 'src/file/file.service';
import { successRes } from 'src/helpers/success-response';

@Injectable()
export class VideosOfTeachersService {
  constructor(@InjectModel(Videos_of_teachers) private model: typeof Videos_of_teachers,
    private readonly fileService: FileService) { }

  async create(createVideosOfTeacherDto: CreateVideosOfTeacherDto, file?: Express.Multer.File) {
    try {
      let video: undefined | string
      if (file) {
        video = await this.fileService.createFile(file)
      }
      const videos_of_teachers = await this.model.create({ ...createVideosOfTeacherDto, video_url: video })
      return successRes(videos_of_teachers)
    } catch (error) {
      handleError(error)
    }
  }

  async findAll() {
    try {
      const videos_of_teachers = await this.model.findAll({ include: { all: true } })
      return successRes(videos_of_teachers)
    } catch (error) {
      handleError(error)
    }
  }

  async findOne(id: number) {
    try {
      const videos_of_teachers = await this.model.findByPk(id, { include: { all: true } })
      if (!videos_of_teachers) {
        throw new NotFoundException()
      }
      return successRes(videos_of_teachers)
    } catch (error) {
      handleError(error)
    }
  }

  async update(id: number, updateVideosOfTeacherDto: UpdateVideosOfTeacherDto, file?: Express.Multer.File) {
    try {
      const teacher_videos = await this.model.findByPk(id)
      if (!teacher_videos) throw new NotFoundException("Videos of teachers not found");
      let video = teacher_videos?.video_url
      if (file) {
        if (video && (await this.fileService.existFile(video))) {          
          await this.fileService.deleteFile(video)
        }
        video = await this.fileService.createFile(file)
      }
      const updateVideo = await this.model.update({ ...updateVideosOfTeacherDto, video }, { where: { id }, returning: true })
      return successRes(updateVideo)
    } catch (error) {
      return handleError(error)
    }
  }

  async remove(id: number) {
    try {
      const videos_of_teachers = await this.model.findByPk(id)
      if (videos_of_teachers?.video_url && (await this.fileService.existFile(videos_of_teachers.video_url))) await this.fileService.deleteFile(videos_of_teachers.video_url);
      await this.model.destroy({ where: { id } })
      return successRes({ message: "Videos-of-projects deleted succesfully" })
    } catch (error) {
      return handleError(error)
    }
  }

  async findTeacherVideoById(id: number): Promise<object> {
    try {
      const teacher_videos = await this.model.findByPk(id)
      if (!teacher_videos) throw new NotFoundException("Teacher videos not found");
      return teacher_videos.dataValues
    } catch (error) {
      return handleError(error)
    }
  }
}

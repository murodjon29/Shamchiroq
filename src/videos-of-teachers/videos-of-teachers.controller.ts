import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { VideosOfTeachersService } from './videos-of-teachers.service';
import { CreateVideosOfTeacherDto } from './dto/create-videos-of-teacher.dto';
import { UpdateVideosOfTeacherDto } from './dto/update-videos-of-teacher.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoValidationPipe } from 'src/pipes/video.validation.pipe';

@Controller('videos-of-teachers')
export class VideosOfTeachersController {
  constructor(
    private readonly videosOfTeachersService: VideosOfTeachersService,
  ) { }

  @UseInterceptors(FileInterceptor('video'))
  @Post()
  create(@Body() createVideosOfTeacherDto: CreateVideosOfTeacherDto,
  @UploadedFile( new VideoValidationPipe) file?: Express.Multer.File
  ) {
    return this.videosOfTeachersService.create(createVideosOfTeacherDto, file);
  }

  @Get()
  findAll() {
    return this.videosOfTeachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosOfTeachersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVideosOfTeacherDto: UpdateVideosOfTeacherDto,
  ) {
    return this.videosOfTeachersService.update(+id, updateVideosOfTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosOfTeachersService.remove(+id);
  }
}

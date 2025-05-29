import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VideosOfTeachersService } from './videos-of-teachers.service';
import { CreateVideosOfTeacherDto } from './dto/create-videos-of-teacher.dto';
import { UpdateVideosOfTeacherDto } from './dto/update-videos-of-teacher.dto';

@Controller('videos-of-teachers')
export class VideosOfTeachersController {
  constructor(
    private readonly videosOfTeachersService: VideosOfTeachersService,
  ) {}

  @Post()
  create(@Body() createVideosOfTeacherDto: CreateVideosOfTeacherDto) {
    return this.videosOfTeachersService.create(createVideosOfTeacherDto);
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

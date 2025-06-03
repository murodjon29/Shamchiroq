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
import { VideosOfProjectsService } from './videos-of-projects.service';
import { CreateVideosOfProjectDto } from './dto/create-videos-of-project.dto';
import { UpdateVideosOfProjectDto } from './dto/update-videos-of-project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoValidationPipe } from 'src/pipes/video.validation.pipe';

@Controller('videos-of-projects')
export class VideosOfProjectsController {
  constructor(
    private readonly videosOfProjectsService: VideosOfProjectsService,
  ) { }
  @UseInterceptors(FileInterceptor('video'))
  @Post()
  create(@Body() CreateVideosOfProjectDto: CreateVideosOfProjectDto,
    @UploadedFile(new VideoValidationPipe) file?: Express.Multer.File
  ) {
    return this.videosOfProjectsService.create(CreateVideosOfProjectDto, file);
  }


  @Get()
  findAll() {
    return this.videosOfProjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosOfProjectsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVideosOfProjectDto: UpdateVideosOfProjectDto,
  ) {
    return this.videosOfProjectsService.update(+id, updateVideosOfProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosOfProjectsService.remove(+id);
  }
}

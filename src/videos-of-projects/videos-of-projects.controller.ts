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
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { VideosOfProjectsService } from './videos-of-projects.service';
import { CreateVideosOfProjectDto } from './dto/create-videos-of-project.dto';
import { UpdateVideosOfProjectDto } from './dto/update-videos-of-project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoValidationPipe } from 'src/pipes/video.validation.pipe';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CheckRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum';
import { SelfGuard } from 'src/guards/self.guard';

@Controller('videos-of-projects')
export class VideosOfProjectsController {
  constructor(
    private readonly videosOfProjectsService: VideosOfProjectsService,
  ) {}

  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Post()
  create(
    @Body() createVideosOfProjectDto: CreateVideosOfProjectDto,
    @UploadedFile(new VideoValidationPipe()) file?: Express.Multer.File,
  ): Promise<object | undefined> {
    return this.videosOfProjectsService.create(createVideosOfProjectDto, file);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Get()
  findAll(): Promise<object> {
    return this.videosOfProjectsService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<object> {
    return this.videosOfProjectsService.findOne(+id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard, SelfGuard)
  @CheckRoles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVideosOfProjectDto: UpdateVideosOfProjectDto,
    @UploadedFile(new VideoValidationPipe()) file?: Express.Multer.File,
  ): Promise<object> {
    return this.videosOfProjectsService.update(
      +id,
      updateVideosOfProjectDto,
      file,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<object> {
    return this.videosOfProjectsService.remove(+id);
  }
}

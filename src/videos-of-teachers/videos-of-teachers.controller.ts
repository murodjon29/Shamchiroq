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
import { VideosOfTeachersService } from './videos-of-teachers.service';
import { CreateVideosOfTeacherDto } from './dto/create-videos-of-teacher.dto';
import { UpdateVideosOfTeacherDto } from './dto/update-videos-of-teacher.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoValidationPipe } from 'src/pipes/video.validation.pipe';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { CheckRoles } from 'src/decorators/role.decorator';
import { SelfGuard } from 'src/guards/self.guard';

@Controller('videos-of-teachers')
export class VideosOfTeachersController {
  constructor(
    private readonly videosOfTeachersService: VideosOfTeachersService,
  ) {}

  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Post()
  create(
    @Body() createVideosOfTeacherDto: CreateVideosOfTeacherDto,
    @UploadedFile(new VideoValidationPipe()) file?: Express.Multer.File,
  ): Promise<object> {
    return this.videosOfTeachersService.create(createVideosOfTeacherDto, file);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Get()
  findAll() {
    return this.videosOfTeachersService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<object> {
    return this.videosOfTeachersService.findOne(+id);
  }

  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(AuthGuard, SelfGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVideosOfTeacherDto: UpdateVideosOfTeacherDto,
    @UploadedFile(new VideoValidationPipe()) file?: Express.Multer.File,
  ): Promise<object> {
    return this.videosOfTeachersService.update(
      +id,
      updateVideosOfTeacherDto,
      file,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.videosOfTeachersService.remove(+id);
  }
}

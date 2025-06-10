import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CheckRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { handleError } from 'src/helpers/responseError';
import { VideoValidationPipe } from 'src/pipes/video.validation.pipe';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @UseInterceptors(FilesInterceptor('videos'))
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles(new VideoValidationPipe()) file?: Express.Multer.File[],
  ) {
    try {
      return this.projectsService.create(createProjectDto, file);
    } catch (error) {
      return handleError(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Get()
  findAll(): Promise<object> {
    return this.projectsService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<object> {
    return this.projectsService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @UseInterceptors(FilesInterceptor('videos'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFiles(new VideoValidationPipe()) file?: Express.Multer.File[],
  ): Promise<object> {
    
    return this.projectsService.update(+id, updateProjectDto, file);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<object | undefined> {
    return this.projectsService.delete(id);
  }
}

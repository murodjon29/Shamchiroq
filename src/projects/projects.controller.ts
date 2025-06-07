import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CheckRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum';
import { SelfGuard } from 'src/guards/self.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<object> {
    return this.projectsService.create(createProjectDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Get()
  findAll(): Promise<object> {
    return this.projectsService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<object> {
    return this.projectsService.findOne(+id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<object> {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<object> {
    return this.projectsService.remove(+id);
  }
}

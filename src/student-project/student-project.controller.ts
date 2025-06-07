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
import { StudentProjectService } from './student-project.service';
import { CreateStudentProjectDto } from './dto/create-student-project.dto';
import { UpdateStudentProjectDto } from './dto/update-student-project.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CheckRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum';
import { SelfGuard } from 'src/guards/self.guard';

@Controller('student-projects')
export class StudentProjectController {
  constructor(private readonly studentProjectService: StudentProjectService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Post()
  create(
    @Body() createStudentProjectDto: CreateStudentProjectDto,
  ): Promise<object> {
    return this.studentProjectService.create(createStudentProjectDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Get()
  findAll(): Promise<object> {
    return this.studentProjectService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<object> {
    return this.studentProjectService.findOne(+id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(':id')
  update(
    @Param('idf') id: string,
    @Body() updateStudentProjectDto: UpdateStudentProjectDto,
  ): Promise<object> {
    return this.studentProjectService.update(+id, updateStudentProjectDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<object> {
    return this.studentProjectService.remove(+id);
  }
}

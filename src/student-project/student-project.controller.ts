import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentProjectService } from './student-project.service';
import { CreateStudentProjectDto } from './dto/create-student-project.dto';
import { UpdateStudentProjectDto } from './dto/update-student-project.dto';
import { Students_projects } from './model/student-project.entity';

@Controller('student-projects')
export class StudentProjectController {
  constructor(private readonly studentProjectService: StudentProjectService) { }

  @Post()
  create(@Body() createStudentProjectDto: CreateStudentProjectDto): Promise<Students_projects> {
    return this.studentProjectService.create(createStudentProjectDto);
  }

  @Get()
  findAll(): Promise<Students_projects[]> {
    return this.studentProjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Students_projects> {
    return this.studentProjectService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentProjectDto: UpdateStudentProjectDto,
  ): Promise<Students_projects> {
    return this.studentProjectService.update(+id, updateStudentProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.studentProjectService.remove(+id);
  }
}
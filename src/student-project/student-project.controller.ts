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

@Controller('student-projects')
export class StudentProjectController {
  constructor(private readonly studentProjectService: StudentProjectService) { }

  @Post()
  create(@Body() createStudentProjectDto: CreateStudentProjectDto): Promise<object> {
    return this.studentProjectService.create(createStudentProjectDto);
  }

  @Get()
  findAll(): Promise<object> {
    return this.studentProjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<object> {
    return this.studentProjectService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentProjectDto: UpdateStudentProjectDto,
  ): Promise<object> {
    return this.studentProjectService.update(+id, updateStudentProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<object> {
    return this.studentProjectService.remove(+id);
  }
}
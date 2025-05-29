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

@Controller('student-project')
export class StudentProjectController {
  constructor(private readonly studentProjectService: StudentProjectService) {}

  @Post()
  create(@Body() createStudentProjectDto: CreateStudentProjectDto) {
    return this.studentProjectService.create(createStudentProjectDto);
  }

  @Get()
  findAll() {
    return this.studentProjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentProjectService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentProjectDto: UpdateStudentProjectDto,
  ) {
    return this.studentProjectService.update(+id, updateStudentProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentProjectService.remove(+id);
  }
}

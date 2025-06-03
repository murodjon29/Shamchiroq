import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupStudentsService } from './group-students.service';
import { CreateGroupStudentDto } from './dto/create-group-student.dto';
import { UpdateGroupStudentDto } from './dto/update-group-student.dto';
import { Group_students } from './models/group-student.model';

@Controller('group-students')
export class GroupStudentsController {
  constructor(private readonly groupStudentsService: GroupStudentsService) { }

  @Post()
  create(@Body() createGroupStudentDto: CreateGroupStudentDto): Promise<object> {
    return this.groupStudentsService.create(createGroupStudentDto);
  }

  @Get()
  findAll(): Promise<object> {
    return this.groupStudentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<object> {
    return this.groupStudentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupStudentDto: UpdateGroupStudentDto,
  ): Promise<object> {
    return this.groupStudentsService.update(+id, updateGroupStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<object> {
    return this.groupStudentsService.remove(+id);
  }
}

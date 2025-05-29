import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupTeachersService } from './group-teachers.service';
import { CreateGroupTeacherDto } from './dto/create-group-teacher.dto';
import { UpdateGroupTeacherDto } from './dto/update-group-teacher.dto';

@Controller('group-teachers')
export class GroupTeachersController {
  constructor(private readonly groupTeachersService: GroupTeachersService) {}

  @Post()
  create(@Body() createGroupTeacherDto: CreateGroupTeacherDto) {
    return this.groupTeachersService.create(createGroupTeacherDto);
  }

  @Get()
  findAll() {
    return this.groupTeachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupTeachersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupTeacherDto: UpdateGroupTeacherDto,
  ) {
    return this.groupTeachersService.update(+id, updateGroupTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupTeachersService.remove(+id);
  }
}

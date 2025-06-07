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
import { GroupStudentsService } from './group-students.service';
import { CreateGroupStudentDto } from './dto/create-group-student.dto';
import { UpdateGroupStudentDto } from './dto/update-group-student.dto';
import { Group_students } from './models/group-student.model';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CheckRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum';
import { SelfGuard } from 'src/guards/self.guard';

@Controller('group-students')
export class GroupStudentsController {
  constructor(private readonly groupStudentsService: GroupStudentsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Post()
  create(
    @Body() createGroupStudentDto: CreateGroupStudentDto,
  ): Promise<object> {
    return this.groupStudentsService.create(createGroupStudentDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Get()
  findAll(): Promise<object> {
    return this.groupStudentsService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<object> {
    return this.groupStudentsService.findOne(+id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupStudentDto: UpdateGroupStudentDto,
  ): Promise<object> {
    return this.groupStudentsService.update(+id, updateGroupStudentDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<object> {
    return this.groupStudentsService.remove(+id);
  }
}

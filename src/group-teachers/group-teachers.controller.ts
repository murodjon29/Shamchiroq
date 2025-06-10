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
import { GroupTeachersService } from './group-teachers.service';
import { CreateGroupTeacherDto } from './dto/create-group-teacher.dto';
import { UpdateGroupTeacherDto } from './dto/update-group-teacher.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CheckRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum';
import { SelfGuard } from 'src/guards/self.guard';

@Controller('group-teachers')
export class GroupTeachersController {
  constructor(private readonly groupTeachersService: GroupTeachersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Post()
  create(
    @Body() createGroupTeacherDto: CreateGroupTeacherDto,
  ): Promise<object | undefined> {
    return this.groupTeachersService.create(createGroupTeacherDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Get()
  findAll(): Promise<object | undefined> {
    return this.groupTeachersService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupTeachersService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupTeacherDto: UpdateGroupTeacherDto,
  ) {
    return this.groupTeachersService.update(+id, updateGroupTeacherDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupTeachersService.remove(+id);
  }
}

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
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CheckRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum';
import { SelfGuard } from 'src/guards/self.guard';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Post()
  create(@Body() createGroupDto: CreateGroupDto): Promise<object> {
    return this.groupsService.create(createGroupDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Get()
  findAll(): Promise<object> {
    return this.groupsService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<object> {
    return this.groupsService.findOne(+id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<object> {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<object> {
    return this.groupsService.remove(+id);
  }
}

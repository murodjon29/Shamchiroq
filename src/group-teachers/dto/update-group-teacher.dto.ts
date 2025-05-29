import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupTeacherDto } from './create-group-teacher.dto';

export class UpdateGroupTeacherDto extends PartialType(CreateGroupTeacherDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateVideosOfTeacherDto } from './create-videos-of-teacher.dto';

export class UpdateVideosOfTeacherDto extends PartialType(
  CreateVideosOfTeacherDto,
) { }

import { PartialType } from '@nestjs/mapped-types';
import { CreateVideosOfProjectDto } from './create-videos-of-project.dto';

export class UpdateVideosOfProjectDto extends PartialType(
  CreateVideosOfProjectDto,
) {}

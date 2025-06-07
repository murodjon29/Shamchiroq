import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVideosOfProjectDto {
  @IsNotEmpty()
  project_id: string;

  // @IsString()
  // // @IsNotEmpty()
  // video_url: string
}

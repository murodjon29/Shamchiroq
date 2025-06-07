import { IsInt, IsOptional } from 'class-validator';

export class UpdateStudentProjectDto {
  @IsInt()
  @IsOptional()
  studentId?: number;

  @IsInt()
  @IsOptional()
  projectId?: number;
}

import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  teacher_id: number;
}

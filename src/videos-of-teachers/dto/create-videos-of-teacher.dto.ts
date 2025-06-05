import { IsNotEmpty, IsString } from "class-validator"

export class CreateVideosOfTeacherDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    teacher_id: string
}

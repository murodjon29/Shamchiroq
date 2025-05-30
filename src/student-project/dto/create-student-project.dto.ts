import { IsInt, IsNotEmpty } from "class-validator";

export class CreateStudentProjectDto {
    @IsInt()
    @IsNotEmpty()
    studentId: number;

    @IsInt()
    @IsNotEmpty()
    projectId: number;
}

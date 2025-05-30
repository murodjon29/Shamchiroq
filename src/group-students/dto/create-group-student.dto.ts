import { IsInt, IsNotEmpty } from "class-validator";

export class CreateGroupStudentDto {
    @IsInt()
    @IsNotEmpty()
    group_id: number;

    @IsInt()
    @IsNotEmpty()
    student_id: number;
}

import { IsInt, IsNotEmpty } from "class-validator";

export class UpdateGroupStudentDto {
    @IsInt()
    @IsNotEmpty()
    group_id: number;

    @IsInt()
    @IsNotEmpty()
    student_id: number;
}

import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";


export class SigninStudentDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}
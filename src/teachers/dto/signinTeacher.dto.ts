import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"

export class SigninTeacherDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsStrongPassword()
    @IsNotEmpty()
    password: string

    
}

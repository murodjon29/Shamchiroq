import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class CreateTeacherDto {

    @IsString()
    @IsNotEmpty()
    full_name: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsStrongPassword()
    password: string

    @IsString()
    @IsNotEmpty()
    specialist: string

}

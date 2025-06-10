import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class ConfirmSigninDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    opt: string 
}
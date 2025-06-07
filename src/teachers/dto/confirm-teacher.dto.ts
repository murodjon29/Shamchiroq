import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ConfirmSigninTeacherDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}

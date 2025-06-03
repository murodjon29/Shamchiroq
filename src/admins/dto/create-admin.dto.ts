import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  userName:string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}

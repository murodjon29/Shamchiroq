import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVacancyDto {

    @IsString()
    @IsNotEmpty()
    company_name: string

    @IsString()
    @IsNotEmpty()    
    specialist: string

    @IsNumber()
    @IsNotEmpty() 
    salary: number;
}

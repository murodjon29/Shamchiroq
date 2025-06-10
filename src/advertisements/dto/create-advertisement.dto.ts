import { IsNotEmpty, IsString } from "class-validator";

export class CreateAdvertisementDto {
    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
import { IsDateString, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsDateString()
    birthday: Date;

    @IsString()
    identification: string;
}

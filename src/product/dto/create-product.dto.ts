import { ArrayNotEmpty, IsArray, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    sizeId: number[];

    @IsString()
    description: string;

    @IsDateString()
    created_at: Date;

    @IsDateString()
    updated_at: Date;
    
}

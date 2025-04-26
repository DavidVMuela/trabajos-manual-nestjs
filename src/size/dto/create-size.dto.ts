import { IsString } from "class-validator";
import { Entity } from "typeorm";

@Entity()
export class CreateSizeDto {
    @IsString()
    size: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Type } from "../entities/category.entity";

export class CreateCategoryDto {
	@ApiProperty({ required: true })
	@IsNotEmpty()
	name: string;
}

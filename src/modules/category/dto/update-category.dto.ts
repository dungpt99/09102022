import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateCategoryDto {
	@ApiProperty({ required: false })
	@IsOptional()
	name: string;
}

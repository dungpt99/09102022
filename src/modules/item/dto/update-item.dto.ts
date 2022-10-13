import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { Type } from "../entities/item.entity";

export class UpdateItemDto {
	@ApiProperty({ required: false })
	@IsOptional()
	model: string;

	@ApiProperty({ required: false })
	@IsOptional()
	price: string;

	@ApiProperty({ required: false })
	@IsOptional()
	categoryId: string;

	@ApiProperty({ enum: Type })
	@IsOptional()
	type: Type;

	@ApiProperty({ required: false })
	@IsOptional()
	description: string;

	@ApiProperty({ required: false, type: String, format: "binary" })
	img_item: string;

	@ApiProperty({ required: false, type: String, format: "binary" })
	img_thumbnail: string;
}

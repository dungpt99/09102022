import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Type } from "../entities/item.entity";

export class CreateItemDto {
	@ApiProperty({ required: true })
	@IsNotEmpty()
	model: string;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	price: string;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	categoryId: string;

	@ApiProperty({ enum: Type })
	@IsNotEmpty()
	type: Type;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	description: string;

	@ApiProperty({ required: true, type: String, format: "binary" })
	img_item: string;

	@ApiProperty({ required: true, type: String, format: "binary" })
	img_thumbnail: string;
}

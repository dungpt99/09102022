import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateItemDto {
	@ApiProperty({ required: false })
	@IsOptional()
	model: string;

	@ApiProperty({ required: false })
	@IsOptional()
	price: string;

	@ApiProperty({ required: false })
	@IsOptional()
	category: string;

	@ApiProperty({ required: false })
	@IsOptional()
	description: string;

	@ApiProperty({ required: false, type: String, format: "binary" })
	img_item: string;

	@ApiProperty({ required: false, type: String, format: "binary" })
	img_thumbnail: string;
}

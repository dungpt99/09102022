import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateItemDto {
	@ApiProperty({ required: true })
	@IsNotEmpty()
	name: string;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	title: string;

	@ApiProperty({ required: true, type: Array, format: "binary" })
	files: [string];

	@ApiProperty({ required: true })
	@IsNotEmpty()
	img_title: string;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	content: string;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	author: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdatePostDto {
	@ApiProperty({ required: false })
	@IsOptional()
	name: string;

	@ApiProperty({ required: false })
	@IsOptional()
	title: string;

	@ApiProperty({ required: false, type: String, format: "binary" })
	file: string;

	@ApiProperty({ required: false })
	@IsOptional()
	img_title: string;

	@ApiProperty({ required: false })
	@IsOptional()
	content: string;

	@ApiProperty({ required: false })
	@IsOptional()
	author: string;
}

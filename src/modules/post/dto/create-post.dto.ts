import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePostDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  img_url: string;

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

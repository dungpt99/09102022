import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Query,
	Req,
	Request,
	UploadedFile,
	UploadedFiles,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { CreateItemDto } from "../dto/create-item.dto";
import { ItemEntity } from "../entities/item.entity";
import { ItemService } from "../services/item.service";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { GetItemsDto } from "../dto/list-item.dto";
import { UpdateItemDto } from "../dto/update-item.dto";

@Controller("items")
@ApiBearerAuth()
@ApiTags("Item")
export class ItemController {
	constructor(private readonly itemService: ItemService) {}

	@Post("")
	@ApiConsumes("multipart/form-data")
	@UseInterceptors(FilesInterceptor("files"))
	public async create(
		@Body() createItemDto: CreateItemDto,
		@UploadedFiles()
		files: {
			img_item?: Express.Multer.File[];
			img_thumbnail?: Express.Multer.File[];
		}
	): Promise<any> {
		console.log("====================================");
		console.log(files);
		console.log("====================================");
		// return await this.itemService.create(createItemDto, files);
	}

	// @Get()
	// public async findAll(
	// 	@Query() getPostsDto: GetPostsDto
	// ): Promise<ResponsePagination<ItemEntity>> {
	// 	return await this.itemService.findAll(getPostsDto);
	// }

	// @Get("/:id")
	// public async findOne(
	// 	@Param("id", ParseUUIDPipe) id: string
	// ): Promise<ItemEntity> {
	// 	return await this.itemService.findById(id);
	// }

	// @Put(":id")
	// @ApiConsumes("multipart/form-data")
	// @UseInterceptors(FileInterceptor("file"))
	// async update(
	// 	@Body() updatePostDto: UpdatePostDto,
	// 	@Param("id", ParseUUIDPipe) id: string,
	// 	@UploadedFile() file: Express.Multer.File
	// ): Promise<any> {
	// 	return await this.itemService.update(id, updatePostDto, file);
	// }

	// @Delete(":id")
	// async delete(@Param("id", ParseUUIDPipe) id: string) {
	// 	return await this.itemService.delete(id);
	// }
}

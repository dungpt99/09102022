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
import {
	FileFieldsInterceptor,
	FileInterceptor,
	FilesInterceptor,
} from "@nestjs/platform-express";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { CategoryEntity } from "../entities/category.entity";
import { CategoryService } from "../services/category.service";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { GetCategoriesDto } from "../dto/list-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";

@Controller("categories")
@ApiBearerAuth()
@ApiTags("Category")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post("")
	public async create(
		@Body() createCategoryDto: CreateCategoryDto
	): Promise<CategoryEntity> {
		return await this.categoryService.create(createCategoryDto);
	}

	@Get()
	public async findAll(
		@Query() getCategories: GetCategoriesDto
	): Promise<ResponsePagination<CategoryEntity>> {
		return await this.categoryService.findAll(getCategories);
	}

	@Get("/:id")
	public async findOne(
		@Param("id", ParseUUIDPipe) id: string
	): Promise<CategoryEntity> {
		return await this.categoryService.findById(id);
	}

	@Put(":id")
	async update(
		@Body() updateCategoryDto: UpdateCategoryDto,
		@Param("id", ParseUUIDPipe) id: string
	): Promise<CategoryEntity> {
		return await this.categoryService.update(id, updateCategoryDto);
	}

	@Delete(":id")
	async delete(@Param("id", ParseUUIDPipe) id: string) {
		return await this.categoryService.delete(id);
	}
}

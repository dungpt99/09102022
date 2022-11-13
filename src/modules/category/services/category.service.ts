import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { commonDelete } from "src/common/helper/common-delete";
import { CommonUpdate } from "src/common/helper/common-update";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { GetCategoriesDto } from "../dto/list-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { CategoryEntity } from "../entities/category.entity";
import { CategoryRepository } from "../repositories/category.repository";

@Injectable()
export class CategoryService {
	private readonly logger = new Logger();
	constructor(
		@InjectRepository(CategoryRepository)
		private readonly categoryRepository: CategoryRepository
	) {}

	async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
		try {
			const getCategoryModel = new CategoryEntity();
			const newCategory = {
				...getCategoryModel,
				...createCategoryDto,
			};
			return await this.categoryRepository.save(newCategory);
		} catch (error) {
			this.logger.log(error);
			throw error;
		}
	}

	async update(id: string, body: UpdateCategoryDto) {
		try {
			let getCategory = await this.categoryRepository.findOne({
				id,
				status: true,
			});
			CommonUpdate(getCategory, body);
			return await this.categoryRepository.save(getCategory);
		} catch (error) {
			throw error;
		}
	}

	async updateRecover(id: string) {
		try {
			let getCategory = await this.categoryRepository.findOne({
				id,
				status: false,
			});
			getCategory.status = true;
			return await this.categoryRepository.save(getCategory);
		} catch (error) {
			throw error;
		}
	}

	async findAll(
		params: GetCategoriesDto
	): Promise<ResponsePagination<CategoryEntity>> {
		try {
			return await this.categoryRepository.getCategories(params);
		} catch (error) {
			this.logger.log(error.toString());
			throw error;
		}
	}

	async findById(id: string): Promise<CategoryEntity> {
		try {
			const getCategory = await this.categoryRepository
				.createQueryBuilder("category")
				.leftJoinAndSelect("category.items", "items")
				.where("category.id = :id", { id })
				.andWhere("category.status = :status", { status: true })
				.getOne();
			if (!getCategory) {
				throw new NotFoundException();
			}
			return getCategory;
		} catch (error) {
			this.logger.log(error.toString());
			throw error;
		}
	}

	async delete(id: string) {
		try {
			let getCategory = await this.categoryRepository.findOne({
				id,
				status: true,
			});
			if (!getCategory) {
				throw new NotFoundException();
			}
			getCategory.status = false;
			return await this.categoryRepository.save(getCategory);
		} catch (error) {
			throw error;
		}
	}
}

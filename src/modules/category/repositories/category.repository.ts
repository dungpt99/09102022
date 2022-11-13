import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { CommonPagination } from "src/common/helper/common-pagination";
import { EntityRepository, Repository } from "typeorm";
import { GetCategoriesDto } from "../dto/list-category.dto";
import { CategoryEntity } from "../entities/category.entity";
@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
	async getCategories(
		params: GetCategoriesDto
	): Promise<ResponsePagination<CategoryEntity>> {
		const categories = this.createQueryBuilder("categories")
			.leftJoinAndSelect("categories.items", "items")
			.where("categories.status = :status", { status: params.status ? params.status : true })
			// .andWhere("items.status = :status", { status: true });
		if (params.search) {
			// posts.andWhere("users.desc ilike :desc", {
			//   desc: `%${params.search}%`,
			// });
		}
		if (params.order) {
			categories.orderBy("categories.createdAt", params.order);
		}
		return CommonPagination(params, categories);
	}
}

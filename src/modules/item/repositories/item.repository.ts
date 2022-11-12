import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { CommonPagination } from "src/common/helper/common-pagination";
import { Brackets, EntityRepository, Repository } from "typeorm";
import { GetItemsDto } from "../dto/list-item.dto";
import { ItemEntity } from "../entities/item.entity";
@EntityRepository(ItemEntity)
export class ItemRepository extends Repository<ItemEntity> {
	async getItems(params: GetItemsDto): Promise<ResponsePagination<ItemEntity>> {
		const items = this.createQueryBuilder("items")
			.leftJoinAndSelect("items.category", "category")
			.where("items.status = :status", { status: params.status ? params.status : true });
		if (params.search) {
			items.andWhere(
				new Brackets((qb) => {
					qb.where("items.model ilike :model", {
						model: `%${params.search}%`,
					}).orWhere("category.name ilike :name", {
						name: `%${params.search}%`,
					});
				})
			);
		}
		if (params.order) {
			items.orderBy("items.createdAt", params.order);
		}
		return CommonPagination(params, items);
	}
}

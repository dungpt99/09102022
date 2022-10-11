import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { CommonPagination } from "src/common/helper/common-pagination";
import { EntityRepository, Repository } from "typeorm";
import { GetItemsDto } from "../dto/list-item.dto";
import { ItemEntity } from "../entities/item.entity";
@EntityRepository(ItemEntity)
export class ItemRepository extends Repository<ItemEntity> {
	async getItems(params: GetItemsDto): Promise<ResponsePagination<ItemEntity>> {
		const items = this.createQueryBuilder("items").where(
			"items.status = :status",
			{ status: true }
		);
		if (params.search) {
			// posts.andWhere("users.desc ilike :desc", {
			//   desc: `%${params.search}%`,
			// });
		}
		if (params.order) {
			items.orderBy("items.createdAt", params.order);
		}
		return CommonPagination(params, items);
	}
}

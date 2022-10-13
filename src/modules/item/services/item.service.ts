import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { commonDelete } from "src/common/helper/common-delete";
import { CommonUpdate } from "src/common/helper/common-update";
import { CategoryService } from "src/modules/category/services/category.service";
import { Not } from "typeorm";
import { CreateItemDto } from "../dto/create-item.dto";
import { GetItemsDto } from "../dto/list-item.dto";
import { UpdateItemDto } from "../dto/update-item.dto";
import { ItemEntity } from "../entities/item.entity";
import { ItemRepository } from "../repositories/item.repository";

@Injectable()
export class ItemService {
	private readonly logger = new Logger();
	constructor(
		@InjectRepository(ItemRepository)
		private readonly itemRepository: ItemRepository,
		private readonly categoryService: CategoryService
	) {}

	async create(createItemDto: CreateItemDto, image): Promise<ItemEntity> {
		try {
			const getItemModel = new ItemEntity();
			const category = await this.categoryService.findById(
				createItemDto.categoryId
			);
			delete createItemDto.categoryId;
			const newItem = {
				...getItemModel,
				...createItemDto,
				category,
			};
			newItem.img_item = image.img_item[0].filename;
			newItem.img_thumbnail = image.img_thumbnail[0].filename;
			return await this.itemRepository.save(newItem);
		} catch (error) {
			commonDelete(image.img_item);
			commonDelete(image.img_thumbnail);
			this.logger.log(error);
			throw error;
		}
	}

	async update(id: string, body: UpdateItemDto, image: any) {
		try {
			let getItem = await this.itemRepository.findOne({ id, status: true });
			if (image.img_item) {
				const getItemImg = getItem.img_thumbnail;
				delete getItem.img_thumbnail;
				commonDelete([getItem]);
				getItem.img_thumbnail = getItemImg;
				getItem.img_item = image.img_item[0].filename;
			}
			if (image.img_thumbnail) {
				const getItemImg = getItem.img_item;
				delete getItem.img_item;
				commonDelete([getItem]);
				getItem.img_item = getItemImg;
				getItem.img_thumbnail = image.img_thumbnail[0].filename;
			}
			if (body.categoryId) {
				const category = await this.categoryService.findById(body.categoryId);
				getItem.category = category;
			}
			CommonUpdate(getItem, body);
			return await this.itemRepository.save(getItem);
		} catch (error) {
			throw error;
		}
	}

	async findAll(params: GetItemsDto): Promise<ResponsePagination<ItemEntity>> {
		try {
			return await this.itemRepository.getItems(params);
		} catch (error) {
			this.logger.log(error.toString());
			throw error;
		}
	}

	async findById(id: string): Promise<any> {
		try {
			const getItem = await this.itemRepository.findOne({
				where: {
					id,
					status: true,
				},
				relations: ["category"],
			});
			if (!getItem) {
				throw new NotFoundException();
			}
			const getRelationItems = await this.itemRepository.find({
				where: { id: Not(id) },
				relations: ["category"],
				order: { createdAt: "DESC" },
				take: 10,
			});
			return { item: getItem, relation: getRelationItems };
		} catch (error) {
			this.logger.log(error.toString());
			throw error;
		}
	}

	async delete(id: string) {
		try {
			let getItem = await this.itemRepository.findOne({ id, status: true });
			if (!getItem) {
				throw new NotFoundException();
			}
			getItem.status = false;
			return await this.itemRepository.save(getItem);
		} catch (error) {
			throw error;
		}
	}
}

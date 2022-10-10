import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { commonDelete } from "src/common/helper/common-delete";
import { CommonUpdate } from "src/common/helper/common-update";
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
		private readonly itemRepository: ItemRepository
	) {}

	async create(createItemDto: CreateItemDto, image): Promise<ItemEntity> {
		try {
			const getItemModel = new ItemEntity();
			const newItem = {
				...getItemModel,
				...createItemDto,
			};
			return await this.itemRepository.save(newItem);
		} catch (error) {
			commonDelete(image);
			this.logger.log(error);
			throw error;
		}
	}

	// async update(id: string, body: UpdatePostDto, image: any) {
	// 	try {
	// 		let getPost = await this.postRepository.findOne({ id, status: true });
	// 		if (image) {
	// 			commonDelete([getPost]);
	// 			getPost.img_url = image?.filename;
	// 		}
	// 		CommonUpdate(getPost, body);
	// 		return await this.postRepository.save(getPost);
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }

	// async findAll(params: GetPostsDto): Promise<ResponsePagination<ItemEntity>> {
	// 	try {
	// 		return await this.postRepository.getPosts(params);
	// 	} catch (error) {
	// 		this.logger.log(error.toString());
	// 		throw error;
	// 	}
	// }

	// async findById(id: string): Promise<ItemEntity> {
	// 	try {
	// 		const getPost = await this.postRepository.findOne({ id, status: true });
	// 		if (!getPost) {
	// 			throw new NotFoundException();
	// 		}
	// 		return getPost;
	// 	} catch (error) {
	// 		this.logger.log(error.toString());
	// 		throw error;
	// 	}
	// }

	// async delete(id: string) {
	// 	try {
	// 		let getPost = await this.postRepository.findOne({ id });
	// 		if (!getPost) {
	// 			throw new NotFoundException();
	// 		}
	// 		getPost.status = false;
	// 		return await this.postRepository.save(getPost);
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }
}

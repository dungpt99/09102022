import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { GetItemsDto } from "src/modules/item/dto/list-item.dto";
import { ItemEntity } from "src/modules/item/entities/item.entity";
import { ItemService } from "src/modules/item/services/item.service";
import { GetPostsDto } from "src/modules/post/dto/list-post.dto";
import { PostEntity } from "src/modules/post/entities/post.entity";
import { PostService } from "src/modules/post/services/post.service";

@Injectable()
export class HomeService {
  private readonly logger = new Logger();
  constructor(
    private readonly postService: PostService,
    private readonly itemService: ItemService
  ) {}
  async findAllPost(
    params: GetPostsDto
  ): Promise<ResponsePagination<PostEntity>> {
    try {
      return await this.postService.findAll(params);
    } catch (error) {
      this.logger.log(error.toString());
      throw error;
    }
  }

  async findByIdPost(id: string): Promise<any> {
    try {
      return await this.postService.findById(id);
    } catch (error) {
      this.logger.log(error.toString());
      throw error;
    }
  }

  async findAllItem(
    params: GetItemsDto
  ): Promise<ResponsePagination<ItemEntity>> {
    try {
      return await this.itemService.findAll(params);
    } catch (error) {
      this.logger.log(error.toString());
      throw error;
    }
  }

  async findByIdItem(id: string): Promise<any> {
    try {
      return await this.itemService.findById(id);
    } catch (error) {
      this.logger.log(error.toString());
      throw error;
    }
  }
}

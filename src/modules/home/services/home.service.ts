import {
  Injectable,
  Logger,
} from "@nestjs/common";
import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { GetCategoriesDto } from "src/modules/category/dto/list-category.dto";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
import { CategoryService } from "src/modules/category/services/category.service";
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
    private readonly itemService: ItemService,
    private readonly categoryService: CategoryService
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

  async findAllCategory(
    params: GetCategoriesDto
  ): Promise<ResponsePagination<CategoryEntity>> {
    try {
      return await this.categoryService.findAll(params);
    } catch (error) {
      this.logger.log(error.toString());
      throw error;
    }
  }

  async findByIdCategory(id: string): Promise<any> {
    try {
      return await this.categoryService.findById(id);
    } catch (error) {
      this.logger.log(error.toString());
      throw error;
    }
  }
}

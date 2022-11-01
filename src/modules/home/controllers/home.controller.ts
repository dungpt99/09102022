import { Controller, Get, Param, ParseUUIDPipe, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { Public } from "src/modules/Auth/enableAuthPublic";
import { GetItemsDto } from "src/modules/item/dto/list-item.dto";
import { ItemEntity } from "src/modules/item/entities/item.entity";
import { GetPostsDto } from "src/modules/post/dto/list-post.dto";
import { PostEntity } from "src/modules/post/entities/post.entity";
import { HomeService } from "../services/home.service";

@Public()
@Controller("home")
@ApiTags("home")
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  @Get("posts")
  public async findAllPost(
    @Query() getPostsDto: GetPostsDto
  ): Promise<ResponsePagination<PostEntity>> {
    return await this.homeService.findAllPost(getPostsDto);
  }

  @Get("post/:id")
  public async findOnePost(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<PostEntity> {
    return await this.homeService.findByIdPost(id);
  }

  @Get("items")
  public async findAll(
    @Query() getItemsDto: GetItemsDto
  ): Promise<ResponsePagination<ItemEntity>> {
    return await this.homeService.findAllItem(getItemsDto);
  }

  @Get("item/:id")
  public async findOne(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<ItemEntity> {
    return await this.homeService.findByIdItem(id);
  }
}

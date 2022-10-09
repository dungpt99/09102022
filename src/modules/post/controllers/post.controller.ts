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
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CreatePostDto } from "../dto/create-post.dto";
import { PostEntity } from "../entities/post.entity";
import { PostService } from "../services/post.service";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { GetPostsDto } from "../dto/list-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";

@Controller("posts")
@ApiBearerAuth()
@ApiTags('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post("")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FilesInterceptor("files"))
  public async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<PostEntity> {
    return await this.postService.create(createPostDto, files);
  }

  @Get()
  public async findAll(
    @Query() getPostsDto: GetPostsDto
  ): Promise<ResponsePagination<PostEntity>> {
    return await this.postService.findAll(getPostsDto);
  }

  @Get("/:id")
  public async findOne(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<PostEntity> {
    return await this.postService.findById(id);
  }

  @Put(":id")
  @UseInterceptors(FilesInterceptor("files"))
  async update(
    @Body() updatePostDto: UpdatePostDto,
    @Param("id", ParseUUIDPipe) id: string,
    @UploadedFiles() files: Array<Express.Multer.File>
  ): Promise<any> {
    return 'this.postService.update(id, updatePostDto, files)';
  }

  @Delete(":id")
  async delete(@Param("id", ParseUUIDPipe) id: string) {
    return 'this.postService.delete(id)';
  }
}

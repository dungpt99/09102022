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
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { CreatePostDto } from "../dto/create-post.dto";
import { PostEntity } from "../entities/post.entity";
import { PostService } from "../services/post.service";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { GetPostsDto } from "../dto/list-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { Public } from "src/modules/Auth/enableAuthPublic";
@ApiBearerAuth()
@Controller("posts")
@ApiTags("Post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post("")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  public async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<PostEntity> {
    return await this.postService.create(createPostDto, file);
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
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @Body() updatePostDto: UpdatePostDto,
    @Param("id", ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<any> {
    return await this.postService.update(id, updatePostDto, file);
  }

  @Put("recover/:id")
  async updateRecover(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<any> {
    return await this.postService.updateRecover(id);
  }

  @Delete(":id")
  async delete(@Param("id", ParseUUIDPipe) id: string) {
    return await this.postService.delete(id);
  }
}

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
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateItemDto } from "../dto/create-item.dto";
import { ItemEntity } from "../entities/item.entity";
import { ItemService } from "../services/item.service";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { GetItemsDto } from "../dto/list-item.dto";
import { UpdateItemDto } from "../dto/update-item.dto";

@ApiBearerAuth()
@Controller("items")
@ApiTags("Item")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post("")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "img_item", maxCount: 1 },
      { name: "img_thumbnail", maxCount: 1 },
    ])
  )
  public async create(
    @Body() createItemDto: CreateItemDto,
    @UploadedFiles()
    files: {
      img_item?: Express.Multer.File[];
      img_thumbnail?: Express.Multer.File[];
    }
  ): Promise<ItemEntity> {
    return await this.itemService.create(createItemDto, files);
  }

  @Get()
  public async findAll(
    @Query() getItemsDto: GetItemsDto
  ): Promise<ResponsePagination<ItemEntity>> {
    return await this.itemService.findAll(getItemsDto);
  }

  @Get("/:id")
  public async findOne(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<ItemEntity> {
    return await this.itemService.findById(id);
  }

  @Put(":id")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "img_item", maxCount: 1 },
      { name: "img_thumbnail", maxCount: 1 },
    ])
  )
  async update(
    @Body() updateItemDto: UpdateItemDto,
    @Param("id", ParseUUIDPipe) id: string,
    @UploadedFiles()
    files: {
      img_item?: Express.Multer.File[];
      img_thumbnail?: Express.Multer.File[];
    }
  ): Promise<ItemEntity> {
    return await this.itemService.update(id, updateItemDto, files);
  }

  @Put("recover/:id")
  async updateRecover(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<ItemEntity> {
    return await this.itemService.updateRecover(id);
  }

  @Delete(":id")
  async delete(@Param("id", ParseUUIDPipe) id: string) {
    return await this.itemService.delete(id);
  }
}

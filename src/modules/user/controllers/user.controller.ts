import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserEntity } from "../entities/user.entity";
import { UserService } from "../services/user.service";
import { Public } from "src/modules/auth/enableAuthPublic";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetUsersDto } from "../dto/list-user.dto";
import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Controller("users")
@ApiBearerAuth()
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  public async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }

  // @Get()
  // public async getAll(
  //   @Query() getNewDto: GetUsersDto
  // ): Promise<ResponsePagination<UserEntity>> {
  //   return await this.userService.findAll(getNewDto);
  // }

  @Get("/:id")
  public async findById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findById(id);
  }

  @Put("/:id")
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    return this.userService.update(id, updateUserDto);
  }

  // @Delete("/:id")
  // public async delete(@Param() id: number): Promise<UserEntity> {
  //   return this.userService.delete(id);
  // }
}

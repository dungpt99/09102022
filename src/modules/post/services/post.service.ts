import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { commonDelete } from "src/common/helper/common-delete";
import { commonFilter } from "src/common/helper/common-filter";
import { CommonUpdate } from "src/common/helper/common-update";
<<<<<<< Updated upstream
import { ImagesService } from "src/modules/images/services/images.services";
import { RelationService } from "src/modules/relation/services/relation.service";
=======
>>>>>>> Stashed changes
import { UserService } from "src/modules/user/services/user.service";
import { CreatePostDto } from "../dto/create-post.dto";
import { GetPostsDto } from "../dto/list-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { PostEntity } from "../entities/post.entity";
import { PostRepository } from "../repositories/post.repository";

@Injectable()
export class PostService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,
    private readonly userService: UserService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    imgArray: Array<any>,
  ): Promise<PostEntity> {
    try {
      const getPostModel = new PostEntity();
      const newPost = {
        ...getPostModel,
        ...createPostDto,
      };
      const post = await this.postRepository.save(newPost);
      return post;
    } catch (error) {
      commonDelete(imgArray);
      this.logger.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(params: GetPostsDto): Promise<ResponsePagination<PostEntity>> {
    try {
      return await this.postRepository.getPosts(params);
    } catch (error) {
      this.logger.log(error.toString());
      throw new InternalServerErrorException();
    }
  }

  async findById(id: string): Promise<PostEntity> {
    try {
      const getPost = await this.postRepository.findOne({
        where: {
          id,
        },
        relations: ["images", "user"],
      });

      if (!getPost) {
        throw new NotFoundException();
      }

      return getPost;
    } catch (error) {
      this.logger.log(error.toString());
      throw new InternalServerErrorException();
    }
  }
}

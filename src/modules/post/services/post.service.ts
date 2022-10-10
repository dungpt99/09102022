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
		private readonly userService: UserService
	) {}

	async create(createPostDto: CreatePostDto, image: any): Promise<PostEntity> {
		try {
			const getPostModel = new PostEntity();
			const newPost = {
				...getPostModel,
				...createPostDto,
			};
			newPost.img_url = image.filename;
			const post = await this.postRepository.save(newPost);
			return post;
		} catch (error) {
			commonDelete([image]);
			this.logger.log(error);
			throw error;
		}
	}

	async update(id: string, body: UpdatePostDto, image: any) {
		try {
			let getPost = await this.postRepository.findOne({ id, status: true });
			if (image) {
				commonDelete([getPost]);
				getPost.img_url = image?.filename;
			}
			CommonUpdate(getPost, body);
			return await this.postRepository.save(getPost);
		} catch (error) {
			throw error;
		}
	}

	async findAll(params: GetPostsDto): Promise<ResponsePagination<PostEntity>> {
		try {
			return await this.postRepository.getPosts(params);
		} catch (error) {
			this.logger.log(error.toString());
			throw error;
		}
	}

	async findById(id: string): Promise<PostEntity> {
		try {
			const getPost = await this.postRepository.findOne({ id, status: true });
			if (!getPost) {
				throw new NotFoundException();
			}
			return getPost;
		} catch (error) {
			this.logger.log(error.toString());
			throw error;
		}
	}

	async delete(id: string) {
		try {
			let getPost = await this.postRepository.findOne({ id });
			if (!getPost) {
				throw new NotFoundException();
			}
			getPost.status = false;
			return await this.postRepository.save(getPost);
		} catch (error) {
			throw error;
		}
	}
}

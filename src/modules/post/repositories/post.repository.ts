import { ResponsePagination } from "src/common/dto/response-pagination.dto";
import { CommonPagination } from "src/common/helper/common-pagination";
import { EntityRepository, Repository } from "typeorm";
import { GetPostsDto } from "../dto/list-post.dto";
import { PostEntity } from "../entities/post.entity";
@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
	async getPosts(params: GetPostsDto): Promise<ResponsePagination<PostEntity>> {
		const posts = this.createQueryBuilder("posts").where(
			"posts.status = :status",
			{ status: true }
		);
		if (params.search) {
			posts.andWhere("posts.name ilike :name", {
				name: `%${params.search}%`,
			});
		}
		if (params.order) {
			posts.orderBy("posts.createdAt", params.order);
		}
		return CommonPagination(params, posts);
	}
}

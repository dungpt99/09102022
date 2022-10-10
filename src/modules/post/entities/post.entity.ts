import { UserEntity } from "src/modules/user/entities/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity({ name: "posts" })
export class PostEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ name: "name", type: "varchar", length: 50 })
	name: string;

	@Column({ name: "img_url", type: "varchar", length: 100 })
	img_url: string;

	@Column({ name: "img_title", type: "varchar", length: 50 })
	img_title: string;

	@Column({ name: "title", type: "varchar", length: 50 })
	title: string;

	@Column({ name: "content", type: "varchar", length: 500 })
	content: string;

	@Column({ name: "author", type: "varchar", length: 50 })
	author: string;

	@CreateDateColumn({ type: "timestamp with time zone" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp with time zone" })
	updatedAt: Date;

	@Column({ name: "status", type: "boolean", default: true })
	status: boolean;
}

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

	@Column({ name: "name", type: "varchar", length: 1200 })
	name: string;

	@Column({ name: "img_url", type: "varchar", length: 100 })
	img_url: string;

	@Column({ name: "img_title", type: "varchar", length: 120 })
	img_title: string;

	@Column({ name: "title", type: "varchar", length: 1200 })
	title: string;

	@Column({ name: "content", type: "varchar", length: 5600 })
	content: string;

	@Column({ name: "author", type: "varchar", length: 56 })
	author: string;

	@CreateDateColumn({ type: "timestamp with time zone" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp with time zone" })
	updatedAt: Date;

	@Column({ name: "status", type: "boolean", default: true })
	status: boolean;
}

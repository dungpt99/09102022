import { UserEntity } from "src/modules/user/entities/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity({ name: "items" })
export class ItemEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ name: "model", type: "varchar", length: 20 })
	model: string;

	@Column({ name: "price", type: "varchar", length: 20 })
	price: string;

	@Column({ name: "category", type: "varchar", length: 20 })
	category: string;

	@Column({ name: "status", type: "boolean", default: true })
	status: boolean;

	@Column({ name: "description", type: "varchar", length: 500 })
	description: string;

	@Column({ name: "img_item", type: "varchar", length: 500 })
	img_item: string;

	@Column({ name: "img_thumbnail", type: "varchar", length: 500 })
	img_thumbnail: string;

	@CreateDateColumn({ type: "timestamp with time zone" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp with time zone" })
	updatedAt: Date;
}

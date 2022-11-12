import { CategoryEntity } from "src/modules/category/entities/category.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

export enum Type {
	BEST_SELLER = "best seller",
	NEW_PRODUCT = "new product",
}
@Entity({ name: "items" })
export class ItemEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ name: "model", type: "varchar", length: 56 })
	model: string;

	@Column({ name: "price", type: "varchar", length: 15 })
	price: string;

	@ManyToOne(() => CategoryEntity, (category) => category.items)
	category: CategoryEntity;

	@Column({
		type: "enum",
		enum: Type,
		default: Type.NEW_PRODUCT,
	})
	type: Type;

	@Column({ name: "status", type: "boolean", default: true })
	status: boolean;

	@Column({ name: "description", type: "varchar", length: 3200 })
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

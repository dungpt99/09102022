import { ItemEntity } from "src/modules/item/entities/item.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

export enum Type {
	BEST_SELLER = "best seller",
	NEW_PRODUCT = "new product",
}
@Entity({ name: "categories" })
export class CategoryEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ name: "name", type: "varchar", length: 20 })
	name: string;

	@Column({ name: "status", type: "boolean", default: true })
	status: boolean;

	@OneToMany(() => ItemEntity, (item) => item.category)
	items: ItemEntity[];

	@CreateDateColumn({ type: "timestamp with time zone" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp with time zone" })
	updatedAt: Date;
}

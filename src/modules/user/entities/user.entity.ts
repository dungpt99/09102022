import { TokenEntity } from "src/modules/Auth/entities/auth.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ name: "username", type: "varchar", length: 30, unique: true })
	username: string;

	@Column({ name: "password", type: "varchar", length: 200 })
	password: string;

	@OneToMany(() => TokenEntity, (token) => token.user)
	tokens: TokenEntity[];

	@CreateDateColumn({ type: "timestamp with time zone" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp with time zone" })
	updatedAt: Date;

	@Column({ name: "status", type: "boolean", default: true })
	status: boolean;
}

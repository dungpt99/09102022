import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MulterConfigService } from "src/config/multer/multer";
import { UserModule } from "../user/user.module";
import { ItemController } from "./controllers/item.controller";
import { ItemRepository } from "./repositories/item.repository";
import { ItemService } from "./services/item.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([ItemRepository]),
		UserModule,
		MulterModule.registerAsync({
			useClass: MulterConfigService,
		}),
	],
	providers: [ItemService],
	controllers: [ItemController],
	exports: [ItemService],
})
export class ItemModule {}

import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MulterConfigService } from "src/config/multer/multer";
import { CategoryModule } from "../category/category.module";
import { ItemController } from "./controllers/item.controller";
import { ItemRepository } from "./repositories/item.repository";
import { ItemService } from "./services/item.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([ItemRepository]),
		CategoryModule,
		MulterModule.registerAsync({
			useClass: MulterConfigService,
		}),
	],
	providers: [ItemService],
	controllers: [ItemController],
	exports: [ItemService],
})
export class ItemModule {}

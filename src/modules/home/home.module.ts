import { Module } from "@nestjs/common";
import { CategoryModule } from "../category/category.module";
import { ItemModule } from "../item/item.module";
import { PostModule } from "../post/post.module";
import { HomeController } from "./controllers/home.controller";
import { HomeService } from "./services/home.service";

@Module({
  imports: [PostModule, ItemModule, CategoryModule],
  providers: [HomeService],
  controllers: [HomeController],
  exports: [],
})
export class HomeModule {}

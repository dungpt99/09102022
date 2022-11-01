import { JwtAuthGuard } from "./modules/Auth/jwt-auth.guard";
import { Module } from "@nestjs/common";
import { typeOrmConfig } from "./config/database/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/user/user.module";
import { PostModule } from "./modules/post/post.module";
import { APP_GUARD } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AuthModule } from "./modules/Auth/auth.module";
import { ItemModule } from "./modules/item/item.module";
import { CategoryModule } from "./modules/category/category.module";
import { HomeModule } from "./modules/home/home.module";
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    PostModule,
    ItemModule,
    CategoryModule,
    HomeModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

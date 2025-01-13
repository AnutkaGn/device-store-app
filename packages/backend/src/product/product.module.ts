import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { IsExist } from "@/middlewares/is-exist.middleware";

@Module({
	controllers: [ProductController],
	providers: [ProductService],
})
export class ProductModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(IsExist).forRoutes(
			{
				path: "product/:id",
				method: RequestMethod.GET,
			},
			{
				path: "product/:id",
				method: RequestMethod.PATCH,
			},
			{
				path: "product/:id",
				method: RequestMethod.DELETE,
			},
		);
	}
}

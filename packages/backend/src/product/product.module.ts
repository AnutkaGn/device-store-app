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
	providers: [ProductService, IsExist],
})
export class ProductModule implements NestModule {
	constructor(private readonly isExistMiddleware: IsExist) {}

	configure(consumer: MiddlewareConsumer) {
		consumer.apply(this.isExistMiddleware.use("product", "id")).forRoutes(
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

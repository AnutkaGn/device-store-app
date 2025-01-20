import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { OrderDetailsService } from "@/order-deteils/order-details.service";
import { IsExist } from "@/middlewares/is-exist.middleware";
import { ProductService } from "@/product/product.service";

@Module({
	controllers: [OrderController],
	providers: [OrderService, OrderDetailsService, IsExist, ProductService],
})
export class OrderModule implements NestModule {
	constructor(private readonly isExistMiddleware: IsExist) {}

	configure(consumer: MiddlewareConsumer) {
		consumer.apply(this.isExistMiddleware.use("order", "id")).forRoutes(
			{
				path: "order/:id",
				method: RequestMethod.GET,
			},
			{
				path: "order/:id",
				method: RequestMethod.PATCH,
			},
			{
				path: "order/:id",
				method: RequestMethod.DELETE,
			},
			{
				path: "order/delivery-status/:id",
				method: RequestMethod.PATCH,
			},
			{
				path: "order/payment-status/:id",
				method: RequestMethod.PATCH,
			},
		);
		consumer.apply(this.isExistMiddleware.use("orderDetail", "id")).forRoutes({
			path: "order/order-details/:id",
			method: RequestMethod.DELETE,
		});
	}
}

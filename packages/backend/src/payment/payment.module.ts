import { Module } from "@nestjs/common";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { PrismaService } from "../prisma/prisma.service";
import { OrderService } from "../order/order.service";
import { OrderDetailsService } from "@/order-deteils/order-details.service";
import { ProductService } from "@/product/product.service";

@Module({
	imports: [],
	controllers: [PaymentController],
	providers: [
		PaymentService,
		PrismaService,
		OrderService,
		OrderDetailsService,
		ProductService,
	],
})
export class PaymentModule {}

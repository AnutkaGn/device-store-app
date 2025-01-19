import { Module } from "@nestjs/common";
import { OrderDetailsService } from "./order-details.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
	providers: [OrderDetailsService, PrismaService],
	exports: [OrderDetailsService],
})
export class OrderDetailsModule {}

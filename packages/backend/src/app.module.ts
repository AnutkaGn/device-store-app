import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { EmailModule } from "./email/email.module";
import { APP_GUARD } from "@nestjs/core";
import { AtGuard } from "./common/guards/access-token.guard";
import { AuthService } from "./auth/auth.service";
import { ProductModule } from "./product/product.module";
import { UserService } from "./user/user.service";
import { EmailService } from "./email/email.service";
import { JwtService } from "@nestjs/jwt";
import { RolesGuard } from "./common/guards/roles.guard";
import { OrderModule } from "./order/order.module";
import { OrderDetailsModule } from "./order-deteils/order-details.module";
import { PaymentModule } from "./payment/payment.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		PrismaModule,
		AuthModule,
		UserModule,
		EmailModule,
		ProductModule,
		OrderModule,
		OrderDetailsModule,
		PaymentModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AtGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
		AuthService,
		UserService,
		EmailService,
		JwtService,
	],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EmailService } from "@/email/email.service";
import { UserService } from "@/user/user.service";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AtStrategy } from "../common/strategies/access-token.strategy";
import { UserModule } from "@/user/user.module";

@Module({
	controllers: [AuthController],
	providers: [AuthService, AtStrategy, EmailService, UserService],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>("JWT_SECRET"),
			}),
		}),
	],
})
export class AuthModule {}

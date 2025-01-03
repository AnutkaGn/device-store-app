import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from '@/email/email.service';
import { UserService } from '@/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AtGuard } from './guards/access-token.guard';
import { AtStrategy } from './strategies/access-token.strategy';


@Module({
	controllers: [AuthController],
	providers: [AuthService, AtStrategy, AtGuard, EmailService, UserService],
	imports: [
		ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
            }),
        }),
    ],
})
export class AuthModule {}
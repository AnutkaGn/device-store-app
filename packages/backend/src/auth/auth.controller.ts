import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { EmailService } from "@/email/email.service";
import { VerifyEmailDto } from "@/email/dto/verify-email.dto";
import { LoginResponse, RegisterResponse, VerifyEmailResponse } from "./auth.type";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly emailService: EmailService,
	) {}

	@Post("register")
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() dto: RegisterDto): Promise<RegisterResponse> {
		return await this.authService.register(dto);
	}

	@Post("login")
	@HttpCode(HttpStatus.OK)
	async login(@Body() dto: LoginDto): Promise<LoginResponse> {
		return this.authService.login(dto);
	}

	@Post("verify")
	@HttpCode(HttpStatus.OK)
	async verifyEmail(@Body() dto: VerifyEmailDto): Promise<VerifyEmailResponse> {
		return await this.emailService.verifyCode(dto);
	}

	@Post("logout")
	async logout() {}
}

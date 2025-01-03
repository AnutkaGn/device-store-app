import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { EmailService } from "@/email/email.service";
import { VerifyEmailDto } from "@/email/dto/verify-email.dto";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly emailService: EmailService,
	) {}

	@Post("register")
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() dto: RegisterDto): Promise<{ accessToken: string }> {
		return await this.authService.register(dto);
	}

	@Post("login")
	@HttpCode(HttpStatus.OK)
	async login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
		return this.authService.login(dto);
	}

	@Post("verify")
	@HttpCode(HttpStatus.OK)
	async verifyEmail(@Body() dto: VerifyEmailDto): Promise<{ message: string }> {
		await this.emailService.verifyCode(dto);
		return { message: "Email successfully verified" };
	}

	@Post("logout")
	async logout() {}
}

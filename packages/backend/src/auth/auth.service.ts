import {
	Injectable,
	BadRequestException,
	UnauthorizedException,
	NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@/user/user.service";
import { EmailService } from "@/email/email.service";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly emailService: EmailService,
		private readonly jwtService: JwtService,
	) {}

	async register(dto: RegisterDto): Promise<{ accessToken: string }> {
		const { email, password, fullName, phoneNumber, shippingAddress } = dto;

		const existingUser = await this.userService.findByEmail(email);

		if (existingUser) {
			throw new BadRequestException("User with this email already exists");
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const verificationCode =
			await this.emailService.sendVerificationCode(email);

		const newUser = await this.userService.create({
			email,
			fullName,
			phoneNumber,
			shippingAddress,
			password: hashedPassword,
			verificationCode,
		});

		const accessToken = this.generateToken(
			newUser.id,
			newUser.email,
			newUser.role,
		);

		return { accessToken };
	}

	async login(dto: LoginDto): Promise<{ accessToken: string }> {
		const { email, password } = dto;

		const user = await this.userService.findByEmail(email);
		if (!user) {
			throw new NotFoundException("User not found");
		}

		if (!user.isVerified) {
			throw new UnauthorizedException("Email not verified");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const accessToken = this.generateToken(user.id, user.email, user.role);

		return { accessToken };
	}

	private generateToken(userId: string, email: string, role: string): string {
		const payload = { sub: userId, email, role };
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: '24h',
		});
		return accessToken;
	}
}

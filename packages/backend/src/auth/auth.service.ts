import {
	Injectable,
	BadRequestException,
	UnauthorizedException,
	NotFoundException,
	HttpStatus,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@/user/user.service";
import { EmailService } from "@/email/email.service";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { LoginResponse, RegisterResponse } from "./auth.type";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly emailService: EmailService,
		private readonly jwtService: JwtService,
	) {}

	async register(dto: RegisterDto): Promise<RegisterResponse> {
		const { email, password, fullName, phoneNumber, shippingAddress } = dto;

		const isEmailExist = Boolean(await this.userService.findByEmail(email));

		const isPhoneNumberExist = Boolean(await this.userService.findByPhoneNumber(phoneNumber));

		if (isEmailExist) {
			throw new BadRequestException("User with this email already exists");
		}
		if (isPhoneNumberExist) {
			throw new BadRequestException("User with this phone number already exists");
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const verificationCode =
			await this.emailService.sendVerificationCode(email);

		await this.userService.create({
			email,
			fullName,
			phoneNumber,
			shippingAddress,
			password: hashedPassword,
			verificationCode,
		});

		return {
			message: "User registered successfully",
			statusCode: HttpStatus.CREATED,
		};
	}

	async login(dto: LoginDto): Promise<LoginResponse> {
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

		return {
			accessToken,
			message: "User login successfully",
			statusCode: HttpStatus.OK,
		 };
	}

	private generateToken(userId: string, email: string, role: string): string {
		const payload = { sub: userId, email, role };
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: '24h',
		});
		return accessToken;
	}
}

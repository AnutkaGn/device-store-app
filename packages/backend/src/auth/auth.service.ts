import {
	Injectable,
	BadRequestException,
	UnauthorizedException,
	NotFoundException,
	HttpStatus,
	ForbiddenException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@/user/user.service";
import { EmailService } from "@/email/email.service";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { LoginResponse, RegisterResponse } from "./auth.type";
import { Messages } from "@/common/constants/messages.constant";

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

		const isPhoneNumberExist = Boolean(
			await this.userService.findByPhoneNumber(phoneNumber),
		);

		if (isEmailExist) {
			throw new BadRequestException(Messages.USER_ALREADY_EXISTS);
		}
		if (isPhoneNumberExist) {
			throw new BadRequestException(Messages.PHONE_NUMBER_ALREADY_EXISTS);
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
			message: Messages.USER_REGISTERED_SUCCESSFULLY,
			statusCode: HttpStatus.CREATED,
		};
	}

	async login(dto: LoginDto): Promise<LoginResponse> {
		const { email, password } = dto;

		const user = await this.userService.findByEmail(email);
		if (!user) {
			throw new NotFoundException(Messages.USER_NOT_FOUND);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException(Messages.INVALID_CREDENTIALS);
		}

		if (!user.isVerified) {
			const verificationCode =
				await this.emailService.sendVerificationCode(email);
			await this.userService.update(user.id, { verificationCode });
			throw new ForbiddenException(Messages.EMAIL_NOT_VERIFIED);
		}

		const accessToken = this.generateToken(user.id, user.email, user.role);

		return {
			accessToken,
			message: Messages.USER_LOGIN_SUCCESSFULLY,
			statusCode: HttpStatus.OK,
		};
	}

	private generateToken(userId: string, email: string, role: string): string {
		const payload = { sub: userId, email, role };
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: "24h",
		});
		return accessToken;
	}
}

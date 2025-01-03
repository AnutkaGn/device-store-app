import nodemailer from "nodemailer";
import { PrismaService } from "@/prisma/prisma.service";
import {
	Injectable,
	BadRequestException,
	NotFoundException,
} from "@nestjs/common";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { generateVerificationCode } from "../common/helpers/generate-verification-code.helper";
import { UserService } from "@/user/user.service";

@Injectable()
export class EmailService {
	private transporter;
	constructor(
		private prisma: PrismaService,
		private userService: UserService,
	) {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: parseInt(process.env.SMTP_PORT || "587", 10),
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
	}

	async sendVerificationCode(email: string): Promise<number> {
		const verificationCode = generateVerificationCode();

		const mail = {
			from: process.env.SMTP_FROM,
			to: email,
			subject: "Email Verification",
			text: `
				Hello! Your email verification code is: ${verificationCode}
				Please enter this code in the corresponding field to complete the registration process.
				If you did not register for an account, please ignore this email.
				Best regards, 
				The team
			`,
		};

		try {
			await this.transporter.sendMail(mail);
			return verificationCode;
		} catch (error) {
			throw new BadRequestException("Failed to send email");
		}
	}

	async verifyCode(dto: VerifyEmailDto) {
		const user = await this.userService.findByEmail(dto.email);
		if (!user) {
			throw new NotFoundException("User not found");
		}

		if (!dto.verificationCode) {
			throw new BadRequestException("No verification code");
		}

		if (dto.verificationCode != user.verificationCode) {
			throw new BadRequestException("Invalid verification code");
		}

		await this.prisma.user.update({
			where: { email: dto.email },
			data: {
				isVerified: true,
				verificationCode: null,
			},
		});
	}
}

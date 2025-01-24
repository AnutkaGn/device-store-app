import {
	BadRequestException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { User } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateUserResponseDto } from "./dto/create-user-response.dto";
import { ResponseDto } from "@/common/dto/response.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Messages } from "@/common/constants/messages.constant";
import { ChangePasswordDto } from "./dto/change-password.dto";
import * as bcrypt from "bcrypt";
import { UpdateResponse } from "./user.type";

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateUserDto): Promise<CreateUserResponseDto> {
		const newUser = await this.prisma.user.create({
			data: { ...dto },
		});

		return newUser;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({ where: { email } });
		return user;
	}

	async findById(id: string): Promise<ResponseDto<Partial<User>>> {
		const user = await this.prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				fullName: true,
				phoneNumber: true,
				email: true,
				shippingAddress: true,
			},
		});

		if (!user) {
			throw new NotFoundException(Messages.USER_NOT_FOUND);
		}

		return {
			message: Messages.USER_GET_SUCCESSFULLY,
			statusCode: HttpStatus.OK,
			data: user,
		};
	}

	async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({ where: { phoneNumber } });
		return user;
	}

	async update(userId: string, data: Partial<User>): Promise<UpdateResponse> {
		await this.prisma.user.update({
			where: { id: userId },
			data,
		});
		return {
			message: Messages.USER_UPDATED_SUCCESSFULLY,
			statusCode: HttpStatus.OK,
		};
	}

	async updateProfile(
		userId: string,
		data: UpdateUserDto,
	): Promise<ResponseDto<Partial<User>>> {
		if (data.phoneNumber) {
			const existingPhoneNumber = await this.prisma.user.findUnique({
				where: {
					phoneNumber: data.phoneNumber,
					AND: {
						id: {
							not: userId,
						},
					},
				},
			});

			if (existingPhoneNumber) {
				throw new BadRequestException(Messages.PHONE_NUMBER_ALREADY_EXISTS);
			}
		}

		const user = await this.prisma.user.update({
			where: { id: userId },
			data,
			select: {
				id: true,
				fullName: true,
				phoneNumber: true,
				email: true,
				shippingAddress: true,
			},
		});

		return {
			message: Messages.USER_UPDATED_SUCCESSFULLY,
			statusCode: HttpStatus.OK,
			data: user,
		};
	}

	async changePassword(
		userId: string,
		{ oldPassword, newPassword }: ChangePasswordDto,
	): Promise<ResponseDto<null>> {
		const user = await this.prisma.user.findUnique({ where: { id: userId } });
		const isPasswordMatch = await bcrypt.compare(oldPassword, user!.password);

		if (!isPasswordMatch) {
			throw new BadRequestException(Messages.INCORECT_PASSWORD);
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await this.update(userId, { password: hashedPassword });

		return {
			message: Messages.PASSWORD_UPDATED,
			statusCode: HttpStatus.OK,
		};
	}

	async delete(userId: string): Promise<ResponseDto<null>> {
		await this.prisma.user.delete({ where: { id: userId } });
		return {
			message: Messages.USER_DELETED,
			statusCode: HttpStatus.OK,
		};
	}
}

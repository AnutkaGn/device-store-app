import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { User } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateUserResponseDto } from "./dto/create-user-response.dto";
import { UpdateResponse } from "./user.type";
import { ResponseDto } from "@/common/dto/response.dto";
import { Messages } from "@/common/constants/messages.constant";

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
}

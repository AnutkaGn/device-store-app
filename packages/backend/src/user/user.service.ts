import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { User } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateUserResponseDto } from "./dto/create-user-response.dto";

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
}

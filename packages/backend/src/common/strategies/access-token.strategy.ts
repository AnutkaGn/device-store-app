import { NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaClient, User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Messages } from "../constants/messages.constant";

export class AtStrategy extends PassportStrategy(Strategy, "access") {
	constructor(private readonly prisma: PrismaClient) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: { id: string }): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { id: payload.id },
		});

		if (!user) {
			throw new NotFoundException(Messages.USER_NOT_FOUND);
		}

		return user;
	}
}

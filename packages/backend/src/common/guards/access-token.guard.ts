import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { Messages } from "../constants/messages.constant";

@Injectable()
export class AtGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly jwtService: JwtService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.get<boolean>(
			IS_PUBLIC_KEY,
			context.getHandler(),
		);
		if (isPublic) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new UnauthorizedException(Messages.AUTHORIZATION_TOKEN_MISSING);
		}

		try {
			const decoded = await this.jwtService.verifyAsync(token, {
				secret: process.env.JWT_SECRET,
			});

			request.user = decoded;
			return true;
		} catch (error) {
			throw new UnauthorizedException(Messages.INVALID_OR_EXPIRED_TOKEN);
		}
	}

	private extractTokenFromHeader(request: any): string | null {
		const authorization = request.headers["authorization"];
		if (!authorization) {
			return null;
		}

		const [, token] = authorization.split(" ");
		return token || null;
	}
}

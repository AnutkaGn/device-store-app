import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Messages } from "../constants/messages.constant";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.get<string[]>(
			ROLES_KEY,
			context.getHandler(),
		);

		if (!requiredRoles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user = request.user;

		if (!user || !user.role) {
			throw new ForbiddenException(Messages.USER_ROLES_NOT_FOUND);
		}

		const hasRole = requiredRoles.some((role) => user.role.includes(role));

		if (!hasRole) {
			throw new ForbiddenException(Messages.USER_NOT_HAVE_PERMISSION);
		}

		return true;
	}
}

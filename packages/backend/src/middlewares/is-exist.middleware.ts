import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PrismaService } from "@/prisma/prisma.service";
import { Messages } from "@/common/constants/messages.constant";

@Injectable()
export class IsExist implements NestMiddleware {
	constructor(private readonly prisma: PrismaService) {}

	use(modelType: keyof PrismaService, idField: string = "id") {
		return async (req: Request, _res: Response, next: NextFunction) => {
			const idValue = req.params[idField];

			if (!idValue) {
				throw new NotFoundException(Messages.ID_PARAMETER_REQUIRED);
			}

			const modelDelegate = this.prisma[modelType] as unknown as {
				findUnique: (args: {
					where: Record<string, unknown>;
				}) => Promise<unknown>;
			};

			if (!modelDelegate) {
				throw new NotFoundException(Messages.INVALID_MODEL(modelType));
			}

			try {
				const isExist = await modelDelegate.findUnique({
					where: { [idField]: idValue },
				});

				if (!isExist) {
					throw new NotFoundException(
						Messages.RESOURCE_NOT_FOUND(modelType as string, idValue),
					);
				}

				next();
			} catch (error) {
				throw new NotFoundException(Messages.ERROR_FETCHING_RESOURCE(idValue));
			}
		};
	}
}

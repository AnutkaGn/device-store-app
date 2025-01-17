import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PrismaService } from "@/prisma/prisma.service";
import { Messages } from "@/common/constants/messages.constant";

@Injectable()
export class IsExist implements NestMiddleware {
	constructor(private readonly prisma: PrismaService) {}

	async use(req: Request, _res: Response, next: NextFunction) {
		const model = this.extractModel(req);
		const id = req.params["id"];

		if (!id) {
			throw new NotFoundException(Messages.ID_PARAMETER_REQUIRED);
		}

		const modelDelegate = this.prisma[
			model as keyof PrismaService
		] as unknown as {
			findUnique: (args: {
				where: Record<string, unknown>;
			}) => Promise<unknown>;
		};

		if (!modelDelegate) {
			throw new NotFoundException(Messages.INVALID_MODEL(model));
		}

		try {
			const isExist = await modelDelegate.findUnique({
				where: { id },
			});

			if (!isExist) {
				throw new NotFoundException(Messages.RESOURCE_NOT_FOUND(model, id));
			}
			next();
		} catch (error) {
			throw new NotFoundException(Messages.ERROR_FETCHING_RESOURCE(id));
		}
	}

	private extractModel(req: Request): string {
		const path = req.originalUrl || req.path;
		return path.split("/")[2].toLowerCase();
	}
}

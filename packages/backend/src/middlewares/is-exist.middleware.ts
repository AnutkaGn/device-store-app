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

		const modelHandler = this.modelHandlers[model];

		if (!modelHandler) {
			throw new NotFoundException(Messages.INVALID_MODEL(model));
		}

		try {
			const isExist = await modelHandler(id);
			if (!isExist) {
				throw new NotFoundException(Messages.RESOURCE_NOT_FOUND(model, id));
			}
			next();
		} catch (error) {
			throw new NotFoundException(Messages.ERROR_FETCHING_RESOURCE(id));
		}
	}

	private readonly modelHandlers: Record<
		string,
		(id: string) => Promise<unknown>
	> = {
		product: (id: string) => this.prisma.product.findUnique({ where: { id } }),
		user: (id: string) => this.prisma.user.findUnique({ where: { id } }),
	};

	private extractModel(req: Request): string {
		const path = req.originalUrl || req.path;
		return path.split("/")[2].toLowerCase();
	}
}

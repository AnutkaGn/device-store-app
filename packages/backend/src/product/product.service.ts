import { Injectable } from "@nestjs/common";
import { Prisma, Product } from "@prisma/client";
import { PrismaService } from "@/prisma/prisma.service";
import { ResponseDto } from "@/common/dto/response.dto";
import { Messages } from "@/common/constants/messages.constant";
import { SortOrder } from "@/common/enums/sort-order.enum";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { GetAllProduct, PaginatedResponse } from "./product.type";
import { GetProductsQueryDto } from "./dto/get-products-query.dto";

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	async create(
		createProductDto: CreateProductDto,
	): Promise<ResponseDto<Product>> {
		const product = await this.prisma.product.create({
			data: createProductDto,
		});
		return {
			statusCode: 201,
			message: Messages.PRODUCT_CREATED,
			data: product,
		};
	}

	async findAll(
		query: GetProductsQueryDto,
	): Promise<ResponseDto<PaginatedResponse<GetAllProduct>>> {
		const { name, sortByPrice, page, limit } = query;
		const skip = (page - 1) * limit;

		const where = this.buildWhereClause(name);
		const orderBy = this.buildOrderByClause(sortByPrice);

		const products = await this.prisma.product.findMany({
			where,
			orderBy,
			skip,
			take: limit,
			select: {
				id: true,
				name: true,
				category: true,
				price: true,
			},
		});

		const total = await this.prisma.product.count({ where });

		if (products.length === 0) {
			return {
				statusCode: 204,
				message: Messages.NO_PRODUCTS_FOUND,
			};
		}

		return {
			statusCode: 200,
			message: Messages.PRODUCTS_RETRIEVED,
			data: { data: products, total },
		};
	}

	async findOne(id: string): Promise<ResponseDto<Product>> {
		const product = await this.prisma.product.findUnique({ where: { id } });
		return {
			statusCode: 200,
			message: Messages.PRODUCTS_RETRIEVED,
			data: product,
		};
	}

	async update(
		id: string,
		updateProductDto: UpdateProductDto,
	): Promise<ResponseDto<Product>> {
		const product = await this.prisma.product.update({
			where: { id },
			data: updateProductDto,
		});
		return {
			statusCode: 200,
			message: Messages.PRODUCT_UPDATED,
			data: product,
		};
	}

	async remove(id: string): Promise<ResponseDto<void>> {
		await this.prisma.product.delete({ where: { id } });
		return {
			statusCode: 200,
			message: Messages.PRODUCT_DELETED,
		};
	}

	private buildWhereClause(
		name?: string,
	): Prisma.ProductWhereInput | undefined {
		return name ? { name: { contains: name, mode: "insensitive" } } : undefined;
	}

	private buildOrderByClause(
		sortByPrice?: SortOrder,
	): Prisma.ProductOrderByWithRelationInput | undefined {
		return sortByPrice ? { price: sortByPrice } : undefined;
	}
}

import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Body,
	Param,
	Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ResponseDto } from "@/common/dto/response.dto";
import { GetAllProduct, PaginatedResponse } from "./product.type";
import { GetProductsQueryDto } from "./dto/get-products-query.dto";
import { Roles } from "@/common/decorators/roles.decorator";
import { Product, UserRole } from "@prisma/client";

@Controller("product")
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Roles(UserRole.ADMIN)
	@Post()
	async create(
		@Body() createProductDto: CreateProductDto,
	): Promise<ResponseDto<Product>> {
		return this.productService.create(createProductDto);
	}

	@Get()
	async findAll(
		@Query() query: GetProductsQueryDto,
	): Promise<ResponseDto<PaginatedResponse<GetAllProduct>>> {
		return this.productService.findAll(query);
	}

	@Get(":id")
	async findOne(@Param("id") id: string): Promise<ResponseDto<Product>> {
		return this.productService.findOne(id);
	}

	@Roles(UserRole.ADMIN)
	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updateProductDto: UpdateProductDto,
	): Promise<ResponseDto<Product>> {
		return this.productService.update(id, updateProductDto);
	}

	@Roles(UserRole.ADMIN)
	@Delete(":id")
	async remove(@Param("id") id: string): Promise<ResponseDto<void>> {
		return this.productService.remove(id);
	}
}

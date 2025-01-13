import { IsOptional, IsString, IsEnum, IsInt, Min } from "class-validator";
import { SORT_ORDER, SortOrder } from "@/common/enums/sort-order.enum";

export class GetProductsQueryDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsEnum(SORT_ORDER)
	sortByPrice?: SortOrder;

	@IsInt()
	@Min(1)
	page: number = 1;

	@IsOptional()
	@IsInt()
	@Min(1)
	limit: number = 10;
}

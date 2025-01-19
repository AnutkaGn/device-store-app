import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateOrderDetailsDto } from "@/order-deteils/dto/create-oder-details.dto";

export class CreateOrderDto {
	@IsString()
	userId: string;

	@IsNumber()
	totalAmount: number;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateOrderDetailsDto)
	orderDetails: CreateOrderDetailsDto[];
}

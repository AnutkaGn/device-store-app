import { IsNumber, IsString } from "class-validator";

export class CreateOrderDetailsDto {
	@IsString()
	orderId: string;

	@IsString()
	productId: string;

	@IsNumber()
	quantity: number;

	@IsNumber()
	priceAtPurchase: number;
}

import { IsString, IsNumber } from "class-validator";

export class CreatePaymentDto {
	@IsString()
	orderId: string;

	@IsNumber()
	totalAmount: number;
}

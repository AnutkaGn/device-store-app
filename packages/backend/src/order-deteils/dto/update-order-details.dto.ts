import { IsNumber, IsString } from "class-validator";

export class UpdateOrderDetailsDto {
	@IsString()
	id: string;

	@IsNumber()
	quantity: number;
}

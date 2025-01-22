import { Controller, Post, Body } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/crate-payment.dto";
import { Payment } from "@prisma/client";
import { ResponseDto } from "@/common/dto/response.dto";

@Controller("payment")
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Post()
	async createOrUpdatePayment(
		@Body() createPaymentDto: CreatePaymentDto,
	): Promise<ResponseDto<Payment>> {
		return this.paymentService.create(createPaymentDto);
	}
}

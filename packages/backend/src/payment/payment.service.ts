import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePaymentDto } from "./dto/crate-payment.dto";
import { generatePaymentStatus } from "@/common/helpers/generate-payment-status.helper";
import { generateTransactionId } from "@/common/helpers/generate-transaction-id.helper";
import { OrderService } from "../order/order.service";
import { Payment } from "@prisma/client";
import { ResponseDto } from "@/common/dto/response.dto";
import { UpdatePaymentPayload } from "./payment.type";
import { Messages } from "@/common/constants/messages.constant";

@Injectable()
export class PaymentService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly orderService: OrderService,
	) {}

	async findByOrderId(orderId: string): Promise<ResponseDto<Payment>> {
		const payment = await this.prisma.payment.findFirst({
			where: { orderId },
		});
		return {
			statusCode: HttpStatus.OK,
			message: Messages.PAYMENT_RETRIEVED,
			data: payment,
		};
	}

	async create(data: CreatePaymentDto): Promise<ResponseDto<Payment>> {
		const { orderId, totalAmount } = data;

		const payment = await this.findByOrderId(orderId);

		if (payment.data) {
			const updatedPayment = await this.update({
				paymentId: payment.data.id,
				totalAmount,
				orderId,
			});

			return {
				statusCode: HttpStatus.OK,
				message: Messages.PAYMENT_UPDATED,
				data: updatedPayment.data,
			};
		} else {
			const paymentStatus = generatePaymentStatus();
			const transactionId = generateTransactionId();

			const newPayment = await this.prisma.payment.create({
				data: {
					orderId,
					totalAmount,
					paymentStatus,
					transactionId,
				},
			});

			await this.orderService.updatePaymentStatus({
				id: orderId,
				paymentStatus,
			});

			return {
				statusCode: HttpStatus.CREATED,
				message: Messages.PAYMENT_CREATED,
				data: newPayment,
			};
		}
	}

	async update(
		data: UpdatePaymentPayload,
	): Promise<ResponseDto<Payment>> {
		const { paymentId, orderId, totalAmount } = data;
		const paymentStatus = generatePaymentStatus();
		const transactionId = generateTransactionId();

		await this.orderService.updatePaymentStatus({
			id: orderId,
			paymentStatus,
		});

		const payment = await this.prisma.payment.update({
			where: { id: paymentId },
			data: { transactionId, paymentStatus, totalAmount },
		});

		return {
			statusCode: HttpStatus.OK,
			message: Messages.PAYMENT_CREATED,
			data: payment,
		};
	}
}

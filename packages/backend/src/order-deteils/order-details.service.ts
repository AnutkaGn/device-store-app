import {
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDetailsDto } from "./dto/create-oder-details.dto";

import { ResponseDto } from "@/common/dto/response.dto";
import { OrderDetailInfo } from "./order-details.type";
import { UpdateOrderDetailsDto } from "./dto/update-order-details.dto";
import { OrderDetail } from "@prisma/client";
import { Messages } from "@/common/constants/messages.constant";

@Injectable()
export class OrderDetailsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateOrderDetailsDto): Promise<ResponseDto<null>> {
		const { orderId, productId, quantity, priceAtPurchase } = data;
		try {
			await this.prisma.orderDetail.create({
				data: {
					orderId,
					productId,
					quantity,
					priceAtPurchase,
				},
			});

			return {
				statusCode: HttpStatus.CREATED,
				message: Messages.ORDER_CREATED,
			};
		} catch (error) {
			throw new InternalServerErrorException(Messages.ORDER_CREATION_FAILED);
		}
	}

	async getById(id: string): Promise<ResponseDto<OrderDetail>> {
		const orderDetail = await this.prisma.orderDetail.findUnique({
			where: { id },
		});
		return {
			statusCode: HttpStatus.OK,
			message: Messages.ORDER_RETRIEVED,
			data: orderDetail,
		};
	}

	async getByOrderId(orderId: string): Promise<ResponseDto<OrderDetailInfo[]>> {
		const orderDetails = await this.prisma.orderDetail.findMany({
			where: {
				orderId: orderId,
			},
			select: {
				id: true,
				productId: true,
				quantity: true,
				priceAtPurchase: true,
				product: {
					select: {
						name: true,
						price: true,
					},
				},
			},
		});

		return {
			statusCode: HttpStatus.OK,
			message: Messages.ORDER_RETRIEVED,
			data: orderDetails,
		};
	}

	async updateQuantity(
		data: UpdateOrderDetailsDto,
	): Promise<ResponseDto<OrderDetail>> {
		const { id, quantity } = data;
		const existingOrderDetail = await this.prisma.orderDetail.findUnique({
			where: { id },
		});

		if (!existingOrderDetail) {
			throw new NotFoundException(Messages.ORDER_DETAILS_NOT_FOUND);
		}

		const orderDetail = await this.prisma.orderDetail.update({
			where: { id },
			data: { quantity },
		});

		return {
			statusCode: HttpStatus.OK,
			message: Messages.ORDER_UPDATED,
			data: orderDetail,
		};
	}

	async delete(id: string): Promise<ResponseDto<OrderDetail>> {
		const deletedOrderDetail = await this.prisma.orderDetail.delete({
			where: { id },
		});

		return {
			statusCode: HttpStatus.OK,
			message: Messages.ORDER_DELETED,
			data: deletedOrderDetail,
		};
	}
}

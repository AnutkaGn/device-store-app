import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { ResponseDto } from "@/common/dto/response.dto";
import { OrderDetailsService } from "@/order-deteils/order-details.service";
import { ProductService } from "@/product/product.service";
import { SORT_ORDER } from "@/common/enums/sort-order.enum";
import { Order } from "@prisma/client";
import {
	FullOrder,
	GetAllOrdersQuery,
	UpdateDeliveryStatusPayload,
	UpdateOrderDetailsPayload,
	UpdatePaymentStatusPayload,
} from "./order.type";
import { CreateOrderDto } from "./dto/create-order.dto";
import { PaginatedResponse } from "@/common/dto/paginated-response.dto";
import { Messages } from "@/common/constants/messages.constant";

@Injectable()
export class OrderService {
	constructor(
		private prisma: PrismaService,
		private orderDetailsService: OrderDetailsService,
		private productService: ProductService,
	) {}

	async getAll(
		queryParams: GetAllOrdersQuery,
		userId: string,
	): Promise<ResponseDto<PaginatedResponse<Order>>> {
		const {
			paymentStatus,
			deliveryStatus,
			sortDirection = SORT_ORDER.DESC,
			page = 1,
			limit = 10,
		} = queryParams;

		const skip = (Number(page) - 1) * Number(limit);

		const orders = await this.prisma.order.findMany({
			where: {
				userId,
				paymentStatus,
				deliveryStatus,
			},
			orderBy: {
				createdAt: sortDirection,
			},
			skip,
			take: Number(limit),
		});

		if (orders.length === 0) {
			return {
				statusCode: HttpStatus.NOT_FOUND,
				message: Messages.ORDER_NOT_FOUND,
			};
		}

		const total = await this.prisma.order.count({
			where: {
				userId,
				paymentStatus,
				deliveryStatus,
			},
		});

		return {
			statusCode: HttpStatus.OK,
			message: Messages.ORDER_RETRIEVED,
			data: {
				data: orders,
				total,
			},
		};
	}

	async getById(id: string): Promise<ResponseDto<FullOrder>> {
		const order = await this.prisma.order.findUnique({
			where: { id },
		});

		const orderDetailsResponse =
			await this.orderDetailsService.getByOrderId(id);

		return {
			statusCode: HttpStatus.OK,
			message: Messages.ORDER_RETRIEVED,
			data: {
				...order!,
				orderDetails: orderDetailsResponse.data!,
			},
		};
	}

	async create(data: CreateOrderDto): Promise<ResponseDto<Order>> {
		const { userId, totalAmount, orderDetails } = data;
		const order = await this.prisma.order.create({
			data: {
				userId,
				totalAmount,
			},
		});

		for (const detail of orderDetails) {
			await this.orderDetailsService.create({
				...detail,
				orderId: order.id,
			});
			await this.productService.updateStock(detail.productId, -detail.quantity);
		}

		return {
			statusCode: HttpStatus.CREATED,
			message: Messages.ORDER_CREATED,
			data: order,
		};
	}

	async updateOrderDetailQuantity(
		id: string,
		data: UpdateOrderDetailsPayload,
	): Promise<ResponseDto<Order>> {
		const { orderDetailId, quantity } = data;

		const orderDetail = await this.orderDetailsService.getById(orderDetailId);

		const updatedOrderDetail = await this.orderDetailsService.updateQuantity({
			id: orderDetailId,
			quantity,
		});

		if (updatedOrderDetail.statusCode != HttpStatus.OK) {
			return {
				statusCode: HttpStatus.NOT_FOUND,
				message: Messages.ORDER_DETAILS_NOT_FOUND,
			};
		}

		const totalAmount = await this.recalculateTotalAmount(id);

		const quantityChange = quantity - orderDetail.data!.quantity;
		await this.productService.updateStock(updatedOrderDetail.data!.productId, -quantityChange);

		const updatedOrder = await this.prisma.order.update({
			where: { id },
			data: { totalAmount },
		});

		return {
			statusCode: HttpStatus.OK,
			message: Messages.ORDER_UPDATED,
			data: updatedOrder,
		};
	}

	async updateDeliveryStatus(
		data: UpdateDeliveryStatusPayload,
	): Promise<ResponseDto<Order>> {
		const { id, deliveryStatus } = data;
		const order = await this.prisma.order.update({
			where: { id },
			data: { deliveryStatus },
		});

		return {
			statusCode: HttpStatus.OK,
			message: Messages.ORDER_UPDATED,
			data: order,
		};
	}

	async updatePaymentStatus(
		data: UpdatePaymentStatusPayload,
	): Promise<ResponseDto<Order>> {
		const { id, paymentStatus } = data;
		const order = await this.prisma.order.update({
			where: { id },
			data: { paymentStatus },
		});

		return {
			statusCode: HttpStatus.OK,
			message: Messages.ORDER_UPDATED,
			data: order,
		};
	}

	async delete(id: string): Promise<ResponseDto<Order>> {
		const orderDetails = await this.orderDetailsService.getByOrderId(id);
		for (const detail of orderDetails.data!) {
			await this.productService.updateStock(detail.productId, detail.quantity);
		}
		const order = await this.prisma.order.delete({
			where: { id },
		});
		return {
			statusCode: HttpStatus.OK,
			message: Messages.ORDER_DELETED,
			data: order,
		};
	}

	async deleteOrderDetail(orderDetailId: string): Promise<ResponseDto<Order>> {
		const orderDetail = await this.orderDetailsService.delete(orderDetailId);
		const id = orderDetail!.data!.orderId;

		const totalAmount = await this.recalculateTotalAmount(id);

		await this.productService.updateStock(orderDetail.data!.productId, orderDetail.data!.quantity);

		if (totalAmount === 0) {
			await this.delete(id);

			return {
				statusCode: HttpStatus.OK,
				message: Messages.ORDER_DELETED,
			};
		} else {
			const updatedOrder = await this.prisma.order.update({
				where: { id },
				data: { totalAmount },
			});

			return {
				statusCode: HttpStatus.OK,
				message: Messages.ORDER_UPDATED,
				data: updatedOrder,
			};
		}
	}

	private async recalculateTotalAmount(orderId: string): Promise<number> {
		const orderDetails = await this.orderDetailsService.getByOrderId(orderId);
		if (orderDetails.data) {
			const totalAmount = orderDetails.data.reduce((total, detail) => {
				return total + detail.quantity * detail.priceAtPurchase;
			}, 0);

			return parseFloat(totalAmount.toFixed(2));
		} else {
			return 0;
		}
	}
}

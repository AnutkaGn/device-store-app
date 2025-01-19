import {
	Body,
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Param,
	Query,
} from "@nestjs/common";
import { GetCurrentUser } from "@/common/decorators/get-user.decorator";
import { DeliveryStatus, Order, PaymentStatus, UserRole } from "@prisma/client";
import { Roles } from "@/common/decorators/roles.decorator";
import { ResponseDto } from "@/common/dto/response.dto";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { GetAllOrdersQuery, UpdateOrderDetailsPayload } from "./order.type";
import { PaginatedResponse } from "@/common/dto/paginated-response.dto";

@Controller("order")
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get()
	async getAll(
		@Query() queryParams: GetAllOrdersQuery,
		@GetCurrentUser() userId: string,
	): Promise<ResponseDto<PaginatedResponse<Order>>> {
		return this.orderService.getAll(queryParams, userId);
	}

	@Get(":id")
	async getById(@Param("id") id: string): Promise<ResponseDto<Order>> {
		return this.orderService.getById(id);
	}

	@Roles(UserRole.ADMIN)
	@Post()
	async create(
		@Body() createOrderDto: CreateOrderDto,
		@GetCurrentUser() userId: string,
	): Promise<ResponseDto<Order>> {
		return this.orderService.create({ ...createOrderDto, userId });
	}

	@Patch(":id")
	async updateOrderDetailsQuantity(
		@Param("id") id: string,
		@Body() updateOrderDetails: UpdateOrderDetailsPayload,
	): Promise<ResponseDto<Order>> {
		return this.orderService.updateOrderDetailQuantity(id, updateOrderDetails);
	}

	@Roles(UserRole.ADMIN)
	@Patch("delivery-status/:id")
	async updateDeliveryStatus(
		@Param("id") id: string,
		@Body("deliveryStatus") deliveryStatus: DeliveryStatus,
	): Promise<ResponseDto<Order>> {
		return this.orderService.updateDeliveryStatus({ id, deliveryStatus });
	}

	@Roles(UserRole.ADMIN)
	@Patch("payment-status/:id")
	async updatePaymentStatus(
		@Param("id") id: string,
		@Body("paymentStatus") paymentStatus: PaymentStatus,
	): Promise<ResponseDto<Order>> {
		return this.orderService.updatePaymentStatus({ id, paymentStatus });
	}

	@Roles(UserRole.ADMIN)
	@Delete(":id")
	async delete(@Param("id") id: string): Promise<ResponseDto<Order>> {
		return this.orderService.delete(id);
	}

	@Delete("order-details/:id")
	async deleteOrderDetail(
		@Param("id") orderDetailId: string,
	): Promise<ResponseDto<Order>> {
		return this.orderService.deleteOrderDetail(orderDetailId);
	}
}

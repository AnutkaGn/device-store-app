import { SortOrder } from "@/common/enums/sort-order.enum";
import { OrderDetailInfo } from "@/order-deteils/order-details.type";
import { DeliveryStatus, PaymentStatus } from "@prisma/client";
import { Order } from "@prisma/client";

export interface GetAllOrdersQuery {
	paymentStatus?: PaymentStatus;
	deliveryStatus?: DeliveryStatus;
	sortDirection?: SortOrder;
	page?: number;
	limit?: number;
}

export interface FullOrder extends Order {
	orderDetails: OrderDetailInfo[];
}

export interface UpdateOrderDetailsPayload {
	orderDetailId: string;
	quantity: number;
}

export interface UpdateDeliveryStatusPayload {
	id: string;
	deliveryStatus: DeliveryStatus;
}

export interface UpdatePaymentStatusPayload {
	id: string;
	paymentStatus: PaymentStatus;
}

import React from "react";
import { Order } from "src/services/order";
import { Layout } from "src/shared/componetnts";
import { Header } from "src/shared/componetnts/header";
import { DELIVERY_STATUS } from "src/shared/enum/delivery-status.enum";
import { PAYMENT_STATUS } from "src/shared/enum/payment-status.enum";
import { OrderCard } from "../../components/order-card/order-card.component";
import { OrderList } from "../../components/orders-list";

const orders: Order[] = [
	{
		id: "2163146c-2277-47d4-950f-a1d878871b06",
		userId: "user123",
		totalAmount: "150.00",
		paymentStatus: PAYMENT_STATUS.PENDING,
		deliveryStatus: DELIVERY_STATUS.PLACED,
		createdAt: "2025-01-20T10:00:00Z",
	},
	{
		id: "2163146c-2277-47d4-950f-a1d878871b05",
		userId: "user456",
		totalAmount: "250.00",
		paymentStatus: PAYMENT_STATUS.SUCCESS,
		deliveryStatus: DELIVERY_STATUS.PLACED,
		createdAt: "2025-01-19T14:30:00Z",
	},
	{
		id: "2163146c-2277-47d4-950f-a1d878871b04",
		userId: "user789",
		totalAmount: "100.00",
		paymentStatus: PAYMENT_STATUS.PENDING,
		deliveryStatus: DELIVERY_STATUS.PLACED,
		createdAt: "2025-01-18T08:45:00Z",
	},
];

export const OrdersScreen = () => {
	return (
		<Layout isScrollable={false}>
			<Header title="Orders" />
			<OrderList orders={orders} />
		</Layout>
	);
};

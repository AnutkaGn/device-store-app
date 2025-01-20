import { DeliveryStatus } from "src/shared/enum/delivery-status.enum";
import { PaymentStatus } from "src/shared/enum/payment-status.enum";

export interface Order {
	id: string;
	userId: string;
	totalAmount: string;
	paymentStatus: PaymentStatus;
	deliveryStatus: DeliveryStatus;
	createdAt: string;
}

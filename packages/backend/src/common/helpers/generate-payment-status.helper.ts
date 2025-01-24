import { PaymentStatus } from "@prisma/client";

export const generatePaymentStatus = (): PaymentStatus => {
	return Math.random() < 0.5 ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;
};

import { Order, OrderDetailInfo } from "src/services/order";
import { create } from "zustand";

interface OrderStore {
	orderDetails: OrderDetailInfo[];
	orders: Order[];
	setOrderDetails: (newDetails: OrderDetailInfo[]) => void;
	setOrders: (orders: Order[]) => void;
	removeOrderById: (id: string) => void;
	setTotalAmount: (id: string, amount: number) => void;
	getOrderDetailById: (id: string) => OrderDetailInfo | undefined;
	updateOrderDetailQuantity: (id: string, quantity: number) => void;
	getTotalAmount: (id: string) => number | undefined;
	updateProductStock: (productId: string, quantityChange: number) => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
	orderDetails: [],
	orders: [],
	setOrderDetails: (newDetails) => {
		set({ orderDetails: newDetails });
	},
	setOrders: (orders) => {
		set({ orders });
	},
	removeOrderById: (id) => {
		set((state) => ({
			orders: state.orders.filter((order) => order.id !== id),
		}));
	},
	setTotalAmount: (id, amount) => {
		set((state) => ({
			orders: state.orders.map((order) =>
				order.id === id
					? { ...order, totalAmount: parseFloat(amount.toFixed(2)) }
					: order,
			),
		}));
	},
	getTotalAmount: (id) => {
		const order = get().orders.find((order) => order.id === id);
		return order ? order.totalAmount : undefined;
	},
	getOrderDetailById: (id) =>
		get().orderDetails.find((detail) => detail.id === id),
	updateOrderDetailQuantity: (id, quantity) => {
		set((state) => {
			const updatedDetails = state.orderDetails.map((detail) =>
				detail.id === id ? { ...detail, quantity } : detail,
			);
			return { orderDetails: updatedDetails };
		});
	},
	updateProductStock: (productId, quantityChange) => {
		set((state) => {
			const updatedOrderDetails = state.orderDetails.map((detail) => {
				if (detail.productId === productId) {
					const updatedProduct = { ...detail.product };
					updatedProduct.stock -= quantityChange;
					return { ...detail, product: updatedProduct };
				}
				return detail;
			});

			return { orderDetails: updatedOrderDetails };
		});
	},
}));

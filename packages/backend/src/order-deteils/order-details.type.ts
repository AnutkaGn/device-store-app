interface ProductInfo {
	name: string;
	price: number;
}

export interface OrderDetail {
	id: string;
	productId: string;
	quantity: number;
	priceAtPurchase: number;
}

export interface OrderDetailInfo {
	id: string;
	productId: string;
	quantity: number;
	priceAtPurchase: number;
	product: ProductInfo;
}

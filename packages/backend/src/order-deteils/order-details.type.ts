interface ProductInfo {
	name: string;
	description: string;
	price: number;
	stock: number;
	category: string;
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

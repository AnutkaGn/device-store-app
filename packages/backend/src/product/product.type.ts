export interface GetAllProduct {
	id: string;
	name: string;
	price: number;
	category: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
}

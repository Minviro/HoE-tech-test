export interface Product {
	created_at: string;
	description: string;
	name: string;
	price: number;
	product_id: number;
	stock_quantity: number;
	quantity?:number;
}

export interface OrderItem {
	product_id: number
    quantity: number
    price_at_purchase: number
}

export type Products = Product[];

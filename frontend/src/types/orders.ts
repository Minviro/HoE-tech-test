import type { Products } from "./product";

export interface OrderMeta {
    order_id: number;
    user_id: string;
    order_date: Date;
    total_price: number;
    status: string;
}

export interface GetOrderResponse {
    order:OrderMeta;
    products: Products
}
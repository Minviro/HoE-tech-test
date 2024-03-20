import { PLACE_ORDER_URL } from "@/constants/api";
import { request } from "@/lib/utils";
import type { Products } from "@/types/product";

export const placeOrder = async ({userId, order}:{userId:string, order:Products}) => {
	const order_items = order.map(item => ({product_id:item.product_id, quantity: 1, price_at_purchase:item.price}))
	const body = JSON.stringify({
		user_id: userId,
		order_items
	});

	console.log("ORDER SUCCESS")

	return await request(PLACE_ORDER_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	});
};

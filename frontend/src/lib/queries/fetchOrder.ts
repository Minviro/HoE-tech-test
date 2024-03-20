import { GET_ORDER_URL } from "@/constants/api";
import type { GetOrderResponse } from "@/types/orders";
import { request } from "../utils";

export const fetchOrder = async (orderId:string) => {
	try {
		const { data } = await request<{data: GetOrderResponse}>(
			`${GET_ORDER_URL}?order_id=${orderId}`,
			{ cache: "no-cache" },
		);
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("error making request");
	}
};

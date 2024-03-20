import { ALL_ORDERS_URL } from "@/constants/api";
import type { OrderMeta } from "@/types/orders";
import { request } from "../utils";

export const fetchAllOrders = async (userId:string) => {
	try {
		const { data } = await request<{ data:OrderMeta[] }>(
			`${ALL_ORDERS_URL}?user_id=${userId}`,
			{ cache: "no-cache" },
		);
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("error making request");
	}
};

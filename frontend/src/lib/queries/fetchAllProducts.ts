import { ALL_PRODUCTS_URL } from "@/constants/api";
import type { Products } from "@/types/product";
import { request } from "../utils";

export const fetchAllProducts = async () => {
	try {
		const { data } = await request<{ status: number; data: Products }>(
			ALL_PRODUCTS_URL,
			{ cache: "no-cache" },
		);
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("error making request");
	}
};

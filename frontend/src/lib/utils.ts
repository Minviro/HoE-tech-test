import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const request = async <TResponse>(
	url: string,
	config: RequestInit = {},
): Promise<TResponse> => {
	const response = await fetch(url, config);

	if (!response.ok) {
		throw new Error("Request error");
	}

	const data = await response.json();

	return data as TResponse;
};

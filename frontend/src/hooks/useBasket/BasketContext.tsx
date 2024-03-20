import { useToast } from "@/components/ui/use-toast";
import { placeOrder } from "@/lib/mutations/placeOrder";
import type { Product, Products } from "@/types/product";
import { useMutation } from "@tanstack/react-query";
import { useList } from "@uidotdev/usehooks";
import { createContext, type ReactNode } from "react";
import { useSession } from "..";

type BasketContextType = {
	basket: Products;
	addToBasket: (product: Product) => void;
	removeFromBasket: (product_id: number) => void;
	size: number;
	isActive: boolean;
	totalCost: number;
	submitBasket: () => Promise<void>;
};

export const BasketContext = createContext<BasketContextType | undefined>(
	undefined,
);

export const BasketProvider = ({ children }: { children: ReactNode }) => {
	const [basket, { push, removeAt, clear }] = useList<Product>([]);
	const { session } = useSession();
	const { mutate } = useMutation({
		mutationFn: placeOrder,
	});
	const { toast } = useToast();

	const addToBasket = (product: Product) => {
		push(product);
	};

	const removeFromBasket = (product_id: number) => {
		const index = basket.findIndex((item) => item.product_id === product_id);
		if (index !== -1) {
			removeAt(index);
		}
	};
	const totalCost = basket.reduce(
		(acc, currentProduct) => acc + currentProduct.price,
		0,
	);
	const submitBasket = async () => {
		const userId = session?.user.id;
		if (userId) {
			try {
				await mutate({ userId, order: basket });
				clear();
				toast({
					title: "Success",
					description: "Order placed",
					variant: "success",
				});
			} catch (error) {
				console.error("something went wrong whilst placing your order");
				toast({
					title: "Error",
					description: "Order unsuccessful",
					variant: "destructive",
				});
			}
			return;
		}
		console.log("no user ID");
	};
	const size = basket.length;
	const isActive = size > 0;

	return (
		<BasketContext.Provider
			value={{
				basket,
				addToBasket,
				removeFromBasket,
				size,
				isActive,
				totalCost,
				submitBasket,
			}}
		>
			{children}
		</BasketContext.Provider>
	);
};

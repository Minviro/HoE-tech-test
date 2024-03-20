"use client";

import { useBasket } from "@/hooks/useBasket";
import type { Product } from "@/types/product";
import clsx from "clsx";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const MiniProductView = ({ name, price }: Product) => {
	return (
		<div className="grid w-full grid-cols-5 items-center gap-5 text-sm">
			<p>1x</p>
			<p className="truncate col-span-3">{name}</p>
			<p>£{price}</p>
		</div>
	);
};

export const MiniBasket = () => {
	const { size, isActive, basket, totalCost, submitBasket } = useBasket();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" disabled={!isActive} className="mr-2">
					{isActive && size}
					<ShoppingCart className={clsx("h-4 w-4", isActive && "ml-2")} />
				</Button>
			</PopoverTrigger>
			{isActive && (
				<PopoverContent className="w-80">
					<div className="grid gap-y-4">
						<div className="space-y-2">
							<h4 className="font-medium leading-none">Your Basket</h4>
						</div>
						<div className="grid gap-2">
							{basket.map((product) => (
								<MiniProductView key={product.product_id} {...product} />
							))}
						</div>
						<div className="text-primary font-semibold">
							Total:{" "}
							<span className="text-white text-sm font-normal">
								£{totalCost}
							</span>
						</div>
						<div className="flex w-full justify-end mt-2">
							<Button onClick={submitBasket} size="sm">
								Place order{" "}
							</Button>
						</div>
					</div>
				</PopoverContent>
			)}
		</Popover>
	);
};

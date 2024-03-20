/* eslint-disable react/no-unescaped-entities */
"use client";

import { Loader } from "@/components/Loader";
import { MiniBasket } from "@/components/MiniBasket";
import { UserDropdown } from "@/components/UserDropdown";
import { ProductTable } from "@/content/Shop/ProductTable";
import { fetchAllProducts } from "@/lib/queries/fetchAllProducts";
import { useQuery } from "@tanstack/react-query";

export const ShopContent = () => {
	const { data: products, isLoading } = useQuery({
		queryKey: ["shop", "products"],
		queryFn: fetchAllProducts,
	});

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="w-full h-full p-5 flex flex-col items-center justify-evenly">
			<nav className="w-full flex justify-between mb-20">
				<div className="w-1/2 flex flex-col justify-start">
					<h1 className="font-bold text-4xl">Minviro Shop</h1>
					<h4>Take a look at this month's offers</h4>
				</div>
				<div className="w-1/2 flex justify-end">
					<MiniBasket />
					<UserDropdown />
				</div>
			</nav>

			<div className="h-full w-full flex flex-col items-center overflow-y-auto">
				<ProductTable data={products ?? []} />
			</div>
		</div>
	);
};

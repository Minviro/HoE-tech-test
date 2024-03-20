/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import type { Product } from "@/types/product";
import type { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { OctagonX, Plus } from "lucide-react";

import { useBasket } from "@/hooks/useBasket";
import type { ReactNode } from "react";
import { SortIcon } from "../../../components/SortIcon";
import { Button } from "../../../components/ui/button";

export const ColumnHeading = ({
	children,
	labelEnd,
}: { children: ReactNode; labelEnd?: boolean }) => {
	return (
		<div
			className={clsx(
				"border-r border-t border-b border-border h-full flex items-center p-4 border-white",
				labelEnd && "justify-end",
			)}
		>
			{children}
		</div>
	);
};

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "product_id",
		header: () => <ColumnHeading>ID</ColumnHeading>,
		cell: ({ getValue }) => (
			<div className="w-12 truncate">{getValue() as string}</div>
		),
	},
	{
		accessorKey: "name",
		header: () => <ColumnHeading> Name</ColumnHeading>,
		cell: ({ getValue }) => (
			<div className="w-56 truncate">{getValue() as string}</div>
		),
	},
	{
		accessorKey: "description",
		header: () => <ColumnHeading> Description</ColumnHeading>,
		cell: ({ getValue }) => (
			<div className="w-72 truncate">{getValue() as string}</div>
		),
	},
	{
		accessorKey: "price",
		header: ({ column }) => {
			const canSort = column.getCanSort();
			const isSorted = column.getIsSorted();

			const handleSortOrder = () => {
				if (!canSort) {
					return null;
				}
				switch (isSorted) {
					case false:
						column.toggleSorting(true);
						break;
					case "desc":
						column.toggleSorting(false);
						break;
					case "asc":
						column.clearSorting();
						break;
				}
			};

			return (
				<Button
					variant="ghost"
					size="sm"
					className="p-4 h-full w-full border-border border-r border-y justify-between"
					onClick={handleSortOrder}
				>
					Price
					<SortIcon sortDirection={isSorted} />
				</Button>
			);
		},
		cell: ({ getValue }) => {
			const amount = Number.parseFloat(getValue() as string);
			const formatted = new Intl.NumberFormat("en-GB", {
				style: "currency",
				currency: "GBP",
			}).format(amount);

			return <div className="w-20 text-right font-medium">{formatted}</div>;
		},
	},
	{
		id: "addToCart",
		header: () => <ColumnHeading> </ColumnHeading>,
		cell: ({ row }) => {
			const { addToBasket } = useBasket();
			const isSoldOut = row.original.stock_quantity > 900;
			const handleClick = () => {
				const productToAdd = row.original;
				addToBasket(productToAdd);
			};

			return isSoldOut ? (
				<div className="flex justify-center">
					<Button
						variant="destructive"
						size="sm"
						className="text-xs w-28 justify-start pl-3"
						disabled
					>
						<OctagonX className="mr-2 h-3 w-3" />
						Sold out
					</Button>
				</div>
			) : (
				<div className="flex justify-center">
					<Button
						variant="secondary"
						size="sm"
						className="text-xs w-28 justify-start pl-3"
						onClick={handleClick}
					>
						<Plus className="mr-2 h-3 w-3" />
						Add to cart
					</Button>
				</div>
			);
		},
	},
];

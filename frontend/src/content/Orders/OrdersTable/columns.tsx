import { ColumnHeading } from "@/content/Shop/ProductTable/columns";
import type { OrderMeta } from "@/types/orders";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<OrderMeta>[] = [
	{
		accessorKey: "order_id",
		header: () => <ColumnHeading>Order ID</ColumnHeading>,
	},
	{
		accessorKey: "status",
		header: () => <ColumnHeading>Status</ColumnHeading>,
	},
	{
		accessorKey: "total_price",
		header: () => <ColumnHeading>Order Total</ColumnHeading>,
		cell: ({ getValue }) => {
			const amount = Number.parseFloat(getValue() as string);
			const formatted = new Intl.NumberFormat("en-GB", {
				style: "currency",
				currency: "GBP",
			}).format(amount);

			return <div className="w-20 text-right">{formatted}</div>;
		},
	},
	{
		accessorKey: "order_date",
		header: () => <ColumnHeading>Date</ColumnHeading>,
		cell: ({ getValue }) => {
			const rawDate = getValue() as string;
			const formatted = new Date(rawDate);

			return <div className="w-32">{formatted.toDateString()}</div>;
		},
	},
];

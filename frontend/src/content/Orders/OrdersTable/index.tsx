"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { OrderMeta } from "@/types/orders";
import type { DataTableProps } from "@/types/tables";
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	type SortingState,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { columns } from "./columns";

export const OrdersTable = ({ data }: DataTableProps<OrderMeta>) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});
	const { push } = useRouter();

	return (
		<div className="w-1/2 overflow-auto rounded-md border-b border-border">
			<Table>
				<TableHeader className="bg-background border-x border-border">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className="border-0">
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id} className="p-0">
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
								className="cursor-pointer"
								onClick={() => {
									push(`/orders/${row.original.order_id}`);
								}}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};

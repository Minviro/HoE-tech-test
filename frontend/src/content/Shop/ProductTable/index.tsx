"use client";

import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
	type SortingState,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Product } from "@/types/product";
import type { DataTableProps } from "@/types/tables";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { columns } from "./columns";

export const ProductTable = ({ data }: DataTableProps<Product>) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onGlobalFilterChange: setGlobalFilter,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			globalFilter,
		},
	});

	return (
		<div className="w-10/12 h-3/4 flex flex-col">
			<div className="flex items-center py-4 w-1/4">
				<Input
					placeholder="Search..."
					value={globalFilter ?? ""}
					onChange={(event) => setGlobalFilter(String(event.target.value))}
				/>
			</div>
			<div className="overflow-auto rounded-md border-b border-border">
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
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

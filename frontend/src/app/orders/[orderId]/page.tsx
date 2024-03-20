/* eslint-disable @tanstack/query/exhaustive-deps */
"use client";

import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useSession } from "@/hooks";
import { fetchOrder } from "@/lib/queries/fetchOrder";
import { useQuery } from "@tanstack/react-query";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductRow } from "./ProductRow";

export default function Order({ params }: { params: { orderId: string } }) {
	const { session } = useSession();
	const { push } = useRouter();
	const { data, isLoading } = useQuery({
		queryKey: ["order"],
		queryFn: () => fetchOrder(params.orderId),
	});
	console.log(data);
	if (isLoading) {
		return <Loader />;
	}

	if (!session) {
		return push("/");
	}

	if (!data) {
		return (
			<main className="w-screen h-screen">
				<h3>Order missing</h3>
			</main>
		);
	}
	const { order, products } = data;

	return (
		<main className="w-screen h-screen">
			<div className="p-4">
				<div className="w-full">
					<Button size="sm" onClick={() => push("/orders")}>
						<Undo2 className="h-4 w-4 mr-2" />
						Back to orders
					</Button>
				</div>
				<div className="w-full flex justify-center">
					<Card className="mt-20 w-1/2">
						<CardHeader>
							<CardTitle>Order: {data.order.order_id}</CardTitle>
							<CardDescription>Status: {data.order.status}</CardDescription>
							<CardDescription>Total: {data.order.total_price}</CardDescription>
							<CardDescription>
								Date created: {new Date(data.order.order_date).toDateString()}
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-8 mt-4">
							{products.map((product) => (
								<ProductRow
									key={product.product_id}
									productName={product.name}
									productDescription={product.description}
									price={product.price}
									orderQuantity={product.quantity ?? 0}
								/>
							))}
						</CardContent>
						<CardFooter className="text-lg mt-4 font-semibold text-primary">
							Total:{" "}
							<span className="text-white ml-1 font-normal">
								£{order.total_price}
							</span>
						</CardFooter>
					</Card>
				</div>
			</div>
		</main>
	);
}

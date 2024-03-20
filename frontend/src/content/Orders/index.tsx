/* eslint-disable @tanstack/query/exhaustive-deps */
import { Loader } from "@/components/Loader";
import { UserDropdown } from "@/components/UserDropdown";
import { useSession } from "@/hooks";
import { fetchAllOrders } from "@/lib/queries/fetchAllOrders";
import { useQuery } from "@tanstack/react-query";
import { OrdersTable } from "./OrdersTable";

export const OrdersContent = () => {
	const { session } = useSession();
	const { data: orders, isLoading } = useQuery({
		queryKey: ["orders"],
		queryFn: () => fetchAllOrders(session?.user.id ?? ""),
	});

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="w-full h-full p-5 flex flex-col items-center justify-evenly">
			<nav className="w-full flex justify-between mb-20">
				<div className="w-1/2 flex flex-col justify-start">
					<h1 className="font-bold text-4xl">Minviro Shop</h1>
					<h4>Your orders</h4>
				</div>
				<div className="w-1/2 flex justify-end">
					<UserDropdown />
				</div>
			</nav>
			<div className="h-full w-full flex flex-col items-center overflow-y-auto">
				<OrdersTable data={orders ?? []} />
			</div>
		</div>
	);
};

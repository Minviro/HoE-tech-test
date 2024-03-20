"use client";

import { Loader } from "@/components/Loader";
import { OrdersContent } from "@/content/Orders";
import { useSession } from "@/hooks";
import { useRouter } from "next/navigation";

export default function Orders() {
	const { session, isLoading } = useSession();
	const { push } = useRouter();

	if (isLoading) {
		return <Loader />;
	}

	if (!session) {
		return push("/");
	}

	return (
		<main className="w-screen h-screen">
			<OrdersContent />
		</main>
	);
}

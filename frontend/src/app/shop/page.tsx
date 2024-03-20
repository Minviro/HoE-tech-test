"use client";

import { Loader } from "@/components/Loader";
import { ShopContent } from "@/content/Shop";
import { useSession } from "@/hooks";
import { useRouter } from "next/navigation";

export default function Shop() {
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
			<ShopContent />
		</main>
	);
}

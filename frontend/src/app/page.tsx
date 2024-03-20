"use client";
import { AuthPanel } from "@/components/AuthPanel";
import { Loader } from "@/components/Loader";
import { useSession } from "@/hooks";
import { useRouter } from "next/navigation";

export default function Home() {
	const { session, isLoading } = useSession();
	const { push } = useRouter();

	if (isLoading) {
		return <Loader />;
	}

	if (session) {
		return push("/shop");
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<AuthPanel />
		</main>
	);
}

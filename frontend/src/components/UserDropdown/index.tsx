import { fetchUser } from "@/lib/queries/fetchUser";
import { logout } from "@/lib/supabase/logout";
import { useQuery } from "@tanstack/react-query";
import { CircleUserRound, LogOut, ScrollText, Store } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Loader } from "../Loader";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const UserDropdown = () => {
	const { data: userData, isLoading } = useQuery({
		queryKey: ["user"],
		queryFn: fetchUser,
	});
	const { push } = useRouter();
	const pathName = usePathname();

	if (isLoading) {
		return <Loader />;
	}

	if (!userData) {
		push("/");
	}

	const username = userData?.user_metadata.username ?? "user";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<CircleUserRound className="mr-2 h-4 w-4" />
					{username}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-fit">
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => push("/shop")}
					disabled={pathName === "/shop"}
				>
					<Store className="mr-2 h-4 w-4" />
					<span>Shop</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => push("/orders")}
					disabled={pathName === "/orders"}
				>
					<ScrollText className="mr-2 h-4 w-4" />
					<span>View orders</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer" onClick={logout}>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

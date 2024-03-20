import type { SortDirection } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface SortIconProps {
	sortDirection: false | SortDirection;
}

export const SortIcon: React.FC<SortIconProps> = ({ sortDirection }) => {
	const buttonIconClass = "h-4 w-4";
	if (!sortDirection) {
		return <ArrowUpDown className={buttonIconClass} />;
	}
	return sortDirection === "asc" ? (
		<ArrowUp className={buttonIconClass} />
	) : (
		<ArrowDown className={buttonIconClass} />
	);
};

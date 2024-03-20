import type { FC } from "react";

interface ProductRowProps {
	productName: string;
	productDescription: string;
	price: number;
	orderQuantity: number;
}

export const ProductRow: FC<ProductRowProps> = ({
	productName,
	productDescription,
	price,
	orderQuantity,
}) => {
	return (
		<div className="flex items-center gap-4">
			<div className="mr-10">{orderQuantity}x</div>
			<div>{productName}</div>
			<div className="ml-auto">£{price}</div>
		</div>
	);
};

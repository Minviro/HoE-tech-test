import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

type RootLayoutProps = Readonly<{
	children: React.ReactNode;
}>;

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Minviro Shop",
	description: "For interview purposes",
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<head />
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}

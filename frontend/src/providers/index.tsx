"use client";
import { BasketProvider } from "@/hooks/useBasket/BasketContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

const queryClient = new QueryClient();

export const Providers = ({ children }: Readonly<{ children: ReactNode }>) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark">
			<QueryClientProvider client={queryClient}>
				<BasketProvider>{children}</BasketProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
};

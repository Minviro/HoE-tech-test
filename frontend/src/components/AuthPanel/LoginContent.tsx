"use client";

import { useTextInput } from "@/hooks";
import { useRouter } from "next/navigation";
import { login } from "../../lib/supabase/login";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TabsContent } from "../ui/tabs";
import { useToast } from "../ui/use-toast";

export const LoginContent = () => {
	const { value: email, handleChange: handleEmailChange } = useTextInput();
	const { value: password, handleChange: handlePasswordChange } =
		useTextInput();

	const { toast } = useToast();
	const { push } = useRouter();

	const loginClickHandler = async () => {
		if (!email || !password) {
			toast({
				title: "Invalid credentials",
				description: "All fields are required",
				variant: "destructive",
			});
		}
		try {
			const { user } = await login({
				email,
				password,
			});

			if (user) {
				push("/shop");
			}
		} catch (error) {
			console.error(error);
			push("/error");
		}
	};

	return (
		<TabsContent value="login">
			<Card>
				<CardHeader>
					<CardTitle>Log In</CardTitle>
					<CardDescription>
						If you already have an account, enter your details below
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					<div className="space-y-1">
						<Label htmlFor="email">Email address</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={handleEmailChange}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="password">password</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={handlePasswordChange}
						/>
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={loginClickHandler}>Log in</Button>
				</CardFooter>
			</Card>
		</TabsContent>
	);
};

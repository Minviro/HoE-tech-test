/* eslint-disable react/no-unescaped-entities */
"use client";

import { useTextInput } from "@/hooks";
import { useRouter } from "next/navigation";
import { signUp } from "../../lib/supabase/signUp";
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

export const SignupContent = () => {
	const { value: username, handleChange: handleUsernameChange } =
		useTextInput();
	const { value: email, handleChange: handleEmailChange } = useTextInput();
	const { value: password, handleChange: handlePasswordChange } =
		useTextInput();
	const { toast } = useToast();
	const { push } = useRouter();

	const createClickHandler = async () => {
		if (!username || !email || !password) {
			toast({
				title: "Invalid credentials",
				description: "All fields are required",
				variant: "destructive",
			});
		}
		try {
			const { user } = await signUp({
				email,
				username,
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
		<TabsContent value="signup">
			<Card>
				<CardHeader>
					<CardTitle>Create Your Account</CardTitle>
					<CardDescription>
						If you don't have an account, create one below
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					<div className="space-y-1">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							type="text"
							value={username}
							onChange={handleUsernameChange}
						/>
					</div>
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
					<Button onClick={createClickHandler}>Create</Button>
				</CardFooter>
			</Card>
		</TabsContent>
	);
};

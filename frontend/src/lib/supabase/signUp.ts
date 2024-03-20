"use client";

import { supabaseClient } from "@/lib/supabase/client";
import type { SignUpWithPasswordCredentials } from "@supabase/supabase-js";

interface UserSignup {
	username: string;
	email: string;
	password: string;
}

export const signUp = async ({ username, email, password }: UserSignup) => {
	const userData = {
		email,
		password,
		options: {
			data: {
				username,
			},
		},
	} as SignUpWithPasswordCredentials;

	const { error, data } = await supabaseClient.auth.signUp(userData);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

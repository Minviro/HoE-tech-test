"use client";

import { supabaseClient } from "@/lib/supabase/client";

interface UserLogin {
	email: string;
	password: string;
}

export const login = async (userData: UserLogin) => {
	const { error, data } =
		await supabaseClient.auth.signInWithPassword(userData);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

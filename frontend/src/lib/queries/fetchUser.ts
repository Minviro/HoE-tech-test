import { supabaseClient } from "../supabase/client";

export const fetchUser = async () => {
	const { data } = await supabaseClient.auth.getUser();
	return data.user;
};

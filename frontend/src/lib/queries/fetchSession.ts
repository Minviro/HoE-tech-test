import type { Session } from "@supabase/supabase-js";
import { supabaseClient } from "../supabase/client";

export const fetchSession = async (): Promise<Session | null> => {
	const { data } = await supabaseClient.auth.getSession();
	return data.session;
};

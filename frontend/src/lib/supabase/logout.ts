import { supabaseClient } from "@/lib/supabase/client";

export const logout = async () => {
	return await supabaseClient.auth.signOut();
};

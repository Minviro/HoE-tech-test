import { fetchSession } from "@/lib/queries/fetchSession";
import { supabaseClient } from "@/lib/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useSession = () => {
	const queryClient = useQueryClient();
	const { data: session, isLoading } = useQuery({
		queryKey: ["session"],
		queryFn: fetchSession,
	});

	useEffect(() => {
		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
			queryClient.setQueryData(["session"], session);
		});

		return () => subscription.unsubscribe();
	}, [queryClient]);

	return { session, isLoading };
};

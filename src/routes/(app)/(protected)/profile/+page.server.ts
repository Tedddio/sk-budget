import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import type { SessionUser } from "$lib/types/SessionUser";

export const load: PageServerLoad = async ({ locals }) => {
    let { user } = locals;
	if (!user) throw redirect(302, "/signin");
	return { user: user as SessionUser };
};


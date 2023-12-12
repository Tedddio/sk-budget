import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    let { session } = locals;
	if (!session) throw redirect(302, "/signin");
	return {
		userId: session.user.userId,
		email: session.user.email,
        fullName: session.user.fullname
	};
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
		throw redirect(302, "/signin"); // redirect to login page
	}
};

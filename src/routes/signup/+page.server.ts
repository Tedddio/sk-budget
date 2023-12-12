import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";

import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, "/");
	return {};
};

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get("email") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const password = formData.get("password") as string;
        // Todo: validate

        try {
            await auth.createUser({
                key: {
                    providerId: "email",
                    providerUserId: email.toLowerCase(),  // unique id when using "email" auth method
                    password // hashed by Lucia
                },
                attributes: {
                    email,
                    firstname: firstName,
                    lastname: lastName,
                }
            });
        } catch (e) {
            console.log(e)
            // this part depends on the database you're using
            // check for unique constraint error in user table
            return fail(500, {
                message: "An error error occurred." + e
            });
        }
        // redirect to
        // make sure you don't throw inside a try/catch block!
        throw redirect(302, "/signin");
    }
};

import { auth } from "$lib/server/lucia";
import { LuciaError } from "lucia";
import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";
import { signinSchema } from "$lib/schemas/signinSchema";

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const user = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        }

        const parsed = signinSchema.safeParse(user);
        if (!parsed.success) {
            return fail(400, { errors: parsed.error.format() });
        }


        // Todo: Validation
        try {
            // find user by key
            // and validate password
            const key = await auth.useKey(
                "email",
                user.email.toLowerCase(),
                user.password
            );
            const session = await auth.createSession({
                userId: key.userId,
                attributes: {}
            });
            locals.auth.setSession(session); // set session cookie
        } catch (e) {
            console.log(e)
            if (
                e instanceof LuciaError &&
                (e.message === "AUTH_INVALID_KEY_ID" ||
                    e.message === "AUTH_INVALID_PASSWORD")
            ) {
                // user does not exist
                // or invalid password
                return fail(400, {
                    message: "Invalid credentials"
                });
            }
            return fail(500, {
                message: "An unknown error occurred"
            });
        }
        // redirect to
        // make sure you don't throw inside a try/catch block!
        throw redirect(302, "/profile");
    }
};

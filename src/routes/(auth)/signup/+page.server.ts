import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";
import { signupSchema } from "$lib/schemas/signupSchema";

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const user = {
            email: formData.get("email") as string,
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string,
        }

        const parsed = signupSchema.safeParse(user);
        if (!parsed.success) {
            return fail(400, { errors: parsed.error.format() });
        }


        // Todo: validate

        try {
            await auth.createUser({
                key: {
                    providerId: "email",
                    providerUserId: user.email.toLowerCase(),  // unique id when using "email" auth method
                    password: user.password // hashed by Lucia
                },
                attributes: {
                    email: user.email,
                    firstname: user.firstName,
                    lastname: user.lastName,
                }
            });
        } catch (e) {
            console.log(e)
            // this part depends on the database you're using
            // check for unique constraint error in user table
            return fail(500, {
                message: "An error error occurred."
            });
        }
        // redirect to
        // make sure you don't throw inside a try/catch block!
        throw redirect(302, "/signin");
    }
};

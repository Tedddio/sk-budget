import { fail, redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import TransactionService from "$lib/services/TransactionService";

export const load: PageServerLoad = async ({ locals }) => {
    let { user } = locals;
    if (!user) throw redirect(302, "/signin");

    try {
        const transactionService = new TransactionService();
        return await transactionService.getAllWithTotal(user.userId)
    } catch (e) {
        console.log(e);
        return fail(500,{
            message: "An error error occurred."
        });
    }
};


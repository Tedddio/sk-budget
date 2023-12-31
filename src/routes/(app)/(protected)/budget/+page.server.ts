import { fail, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";
import BudgetItemService from "$lib/services/BudgetItemService";

export const load: PageServerLoad = async ({ locals }) => {
    let { user } = locals;
    if (!user) throw redirect(302, "/signin");

    try {
        const budgetItemService = new BudgetItemService();
        const budgetItems = await budgetItemService.getAll(user.userId);
        return { budgetItems };
    } catch (e) {
        console.log(e);
        return fail(500, {
            message: "An error error occurred."
        });
    }
};

export const actions: Actions = {
    delete: async ({ request, locals }) => {
        const { user } = locals;
        if (!user) throw redirect(302, "/signin");
        const formData = await request.formData();

        const budgetItemId = formData.get("budgetItemId") as string;

        try {
            const budgetItemService = new BudgetItemService();
            await budgetItemService.delete(budgetItemId, user.userId);
        } catch (e) {
            console.log(e);
            return fail(500, {
                message: "An error occurred"
            });
        }

        throw redirect(302, "/budget");
    }
};

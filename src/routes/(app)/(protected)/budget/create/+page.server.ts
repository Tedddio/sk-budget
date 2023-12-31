import { fail, redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import { createBudgetItemSchema, type CreateBudgetItem } from "$lib/schemas/budgetItemSchema";
import BudgetItemService from "$lib/services/BudgetItemService";
import type { BudgetItemFrequency, TransactionType } from "@prisma/client";


export const load: PageServerLoad = async ({ locals }) => {
    let { user } = locals;
    if (!user) throw redirect(302, "/signin");
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { user } = locals;
        if (!user) throw redirect(302, "/signin");
        const formData = await request.formData();

        const budgetItem: CreateBudgetItem = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            amount: parseFloat(formData.get("amount") as string),
            userId: user.userId,
            transactionType: formData.get("transactionType") as TransactionType,
            frequency: formData.get("frequency") as BudgetItemFrequency,
        };

        const parsed = createBudgetItemSchema.safeParse(budgetItem);
        if (!parsed.success) {
            console.log(parsed.error)
            return fail(400, { errors: parsed.error.format() });
        }

        try {
            const budgetItemService = new BudgetItemService();
            await budgetItemService.create(budgetItem);
        } catch (e) {
            console.log(e);
            return fail(500, {
                message: "An error occurred"
            });
        }

        throw redirect(302, "/budget");
    }
};

import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { TransactionType } from "@prisma/client";
import { createTransactionSchema, type CreateTransaction } from "$lib/schemas/transactionSchema";
import TransactionService from "$lib/services/TransactionService";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    let { user } = locals;
    if (!user) throw redirect(302, "/signin");
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { user } = locals;
        if (!user) throw redirect(302, "/signin");
        const formData = await request.formData();

        const transaction: CreateTransaction = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            amount: parseFloat(formData.get("amount") as string),
            transactionType: formData.get("transactionType") as TransactionType,
            date: new Date(formData.get("date") as string),
            userId: user.userId
        };

        const parsed = createTransactionSchema.safeParse(transaction);
        if (!parsed.success) {
            console.log(parsed.error)
            return fail(400, { errors: parsed.error.format() });
        }

        try {
            const transactionService = new TransactionService();
            await transactionService.create(transaction);
        } catch (e) {
            console.log(e);
            return fail(500, {
                message: "An error occurred"
            });
        }

        throw redirect(302, "/transactions");
    }
};

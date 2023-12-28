import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { TransactionType } from "@prisma/client";
import prisma from "$lib/prisma";
import { createTransactionSchema } from "$lib/schemas/transactionSchema";

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { user } = locals;
        if (!user) throw redirect(302, "/signin");
        const formData = await request.formData();

        const transaction = {
            user_id: user.userId,
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            amount: parseFloat(formData.get("amount") as string),
            transaction_type: formData.get("transactionType") as TransactionType,
            date: new Date(formData.get("date") as string),
        };

        const parsed = createTransactionSchema.safeParse(transaction);
        if (!parsed.success) {
            console.log(parsed.error)
            return fail(400, { errors: parsed.error.format() });
        }

        try {
            await prisma.transaction.create({
            data: transaction
            });
        } catch (e) {
            console.log(e);
            return fail(500, {
                message: "An unknown error occurred"
            });
        }

        throw redirect(302, "/transactions");
    }
};

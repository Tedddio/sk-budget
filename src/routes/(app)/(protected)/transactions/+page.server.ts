import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import type { Transaction } from "@prisma/client";
import prisma from "$lib/prisma";

export const load: PageServerLoad = async ({ locals }) => {
    let { user } = locals;
    if (!user) throw redirect(302, "/signin");
    const transactions = await prisma.$queryRaw<Transaction[]>`
        SELECT * FROM "Transaction"
        WHERE user_id = ${user.userId}
        ORDER BY date asc`;

    return {
        transactions: transactions as Transaction[]
    };
};


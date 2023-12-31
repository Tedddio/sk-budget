import prisma from "$lib/prisma";
import type { CreateBudgetItem } from "$lib/schemas/budgetItemSchema";
import type { BudgetItemsByType } from "$lib/types/BudgetItem";
import type { BudgetItem } from "@prisma/client";

export default class BudgetItemService {
    async create(budgetItem: CreateBudgetItem) {
        await prisma.budgetItem.create({
            data: budgetItem
        });
    }

    async getAll(userId: string): Promise<BudgetItemsByType> {
        // TODO: Should I split sql or manupulate the array
        const expenses = await prisma.$queryRaw<BudgetItem[]>`
            SELECT * FROM "BudgetItem"
            WHERE "userId" = ${userId}
            AND "transactionType" = 'EXPENSE'`;

        const incomes = await prisma.$queryRaw<BudgetItem[]>`
            SELECT * FROM "BudgetItem"
            WHERE "userId" = ${userId}
            AND "transactionType" = 'INCOME'`;

        return {
            expenses,
            incomes
        };
    }
}


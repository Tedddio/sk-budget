import prisma from "$lib/prisma";
import type { CreateBudgetItem } from "$lib/schemas/budgetItemSchema";
import type { BudgetItem } from "@prisma/client";

export default class BudgetItemService {
    async create(budgetItem: CreateBudgetItem) {
        await prisma.budgetItem.create({
            data: budgetItem
        });
    }

    getAll(userId: string): Promise<BudgetItem[]> {
        return prisma.$queryRaw<BudgetItem[]>`
            SELECT * FROM "BudgetItem"
            WHERE "userId" = ${userId}`;
    }
}


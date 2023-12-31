import type { BudgetItem } from "@prisma/client";

export interface BudgetItemsByType {
    expenses: BudgetItem[],
    incomes: BudgetItem[]
}

import { z } from "zod"
import  { BudgetItemFrequency, TransactionType } from "@prisma/client"

export const createBudgetItemSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    amount: z.number(),
    transactionType: z.nativeEnum(TransactionType),
    frequency: z.nativeEnum(BudgetItemFrequency),
    userId: z.string()
})

export type CreateBudgetItem = z.infer<typeof createBudgetItemSchema>;


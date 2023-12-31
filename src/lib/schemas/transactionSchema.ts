import { z } from "zod"
import  { TransactionType } from "@prisma/client"

export const createTransactionSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    amount: z.number(),
    transactionType: z.nativeEnum(TransactionType),
    date: z.date(),
    userId: z.string()
})

export type CreateTransaction = z.infer<typeof createTransactionSchema>;


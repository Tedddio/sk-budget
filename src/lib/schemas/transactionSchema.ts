import { z } from "zod"
import  { TransactionType } from "@prisma/client"

export const createTransactionSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    amount: z.number(),
    transaction_type: z.nativeEnum(TransactionType),
    date: z.date()
})

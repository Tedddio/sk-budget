import type { Transaction } from "@prisma/client"

export interface TransactionsWithTotal {
    transactions: Transaction[],
    total: number
}

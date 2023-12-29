import prisma from "$lib/prisma";
import type { CreateTransaction } from "$lib/schemas/transactionSchema";
import type { TransactionsWithTotal } from "$lib/types/Transactions";
import { TransactionType, type Transaction } from "@prisma/client";

export default class TransactionService {
    async getAllWithTotal(userId: string): Promise<TransactionsWithTotal> {
        const transactions = await prisma.$queryRaw<Transaction[]>`
            SELECT * FROM "Transaction"
            WHERE user_id = ${userId}
            ORDER BY date asc`;
        return {
            transactions,
            total: this.calculateTotal(transactions)
        }
    }

    async create(transaction: CreateTransaction, userId: string) {
        await prisma.transaction.create({
            data: {
                ...transaction,
                user_id: userId
            }
        });
    }

    private calculateTotal(transactions: Transaction[]): number {
        const reducer = (accumulator: number, item: Transaction) => {
            if (item.transaction_type == TransactionType.EXPENSE) {
                return accumulator - item.amount;
            }
            return accumulator + item.amount;
        };

        return transactions.reduce(reducer, 0);
    }
}

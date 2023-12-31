-- CreateEnum
CREATE TYPE "BudgetItemFrequency" AS ENUM ('WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateTable
CREATE TABLE "BudgetItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "transaction_type" "TransactionType" NOT NULL DEFAULT 'EXPENSE',
    "frequeny" "BudgetItemFrequency" NOT NULL DEFAULT 'MONTHLY',
    "amount" DOUBLE PRECISION NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "BudgetItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BudgetItem_id_key" ON "BudgetItem"("id");

-- CreateIndex
CREATE INDEX "BudgetItem_user_id_idx" ON "BudgetItem"("user_id");

-- AddForeignKey
ALTER TABLE "BudgetItem" ADD CONSTRAINT "BudgetItem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

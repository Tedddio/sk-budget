/*
  Warnings:

  - You are about to drop the column `transaction_type` on the `BudgetItem` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `BudgetItem` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_type` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `userId` to the `BudgetItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BudgetItem" DROP CONSTRAINT "BudgetItem_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_user_id_fkey";

-- DropIndex
DROP INDEX "BudgetItem_user_id_idx";

-- DropIndex
DROP INDEX "Transaction_user_id_idx";

-- AlterTable
ALTER TABLE "BudgetItem" DROP COLUMN "transaction_type",
DROP COLUMN "user_id",
ADD COLUMN     "transactionType" "TransactionType" NOT NULL DEFAULT 'EXPENSE',
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transaction_type",
DROP COLUMN "user_id",
ADD COLUMN     "transactionType" "TransactionType" NOT NULL DEFAULT 'EXPENSE',
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "BudgetItem_userId_idx" ON "BudgetItem"("userId");

-- CreateIndex
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetItem" ADD CONSTRAINT "BudgetItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

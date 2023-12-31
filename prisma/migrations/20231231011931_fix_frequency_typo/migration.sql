/*
  Warnings:

  - You are about to drop the column `frequeny` on the `BudgetItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BudgetItem" DROP COLUMN "frequeny",
ADD COLUMN     "frequency" "BudgetItemFrequency" NOT NULL DEFAULT 'MONTHLY';

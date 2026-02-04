/*
  Warnings:

  - You are about to drop the column `number` on the `Orders` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Orders_number_key";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "number";

/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Orders_number_key" ON "Orders"("number");

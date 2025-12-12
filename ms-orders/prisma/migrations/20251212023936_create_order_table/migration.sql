-- CreateEnum
CREATE TYPE "OrdersStatus" AS ENUM ('PENDING', 'PROCESSING', 'REPROVED', 'APPROVED', 'FINISHED');

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "status" "OrdersStatus" NOT NULL DEFAULT 'PENDING',
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

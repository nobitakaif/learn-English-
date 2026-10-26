/*
  Warnings:

  - The `provider` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AUTH_PROVIDER" AS ENUM ('GOOGLE', 'EMAIL');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "provider",
ADD COLUMN     "provider" "AUTH_PROVIDER" NOT NULL DEFAULT 'GOOGLE';

-- CreateTable
CREATE TABLE "WordMeaning" (
    "id" TEXT NOT NULL,

    CONSTRAINT "WordMeaning_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WordMeaning_id_key" ON "WordMeaning"("id");

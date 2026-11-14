/*
  Warnings:

  - You are about to drop the `WordMeaning` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "WordMeaning";

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "firstChar" TEXT NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_text_key" ON "Word"("text");

-- CreateIndex
CREATE INDEX "Word_length_firstChar_idx" ON "Word"("length", "firstChar");

-- CreateIndex
CREATE INDEX "Word_firstChar_idx" ON "Word"("firstChar");

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "occupation" TEXT NOT NULL,
    "currentLevel" TEXT NOT NULL,
    "initialLevel" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_id_key" ON "UserInfo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_userId_key" ON "UserInfo"("userId");

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

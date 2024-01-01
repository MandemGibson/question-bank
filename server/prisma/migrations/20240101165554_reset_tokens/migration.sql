-- CreateTable
CREATE TABLE "ResetTokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetTokens_id_key" ON "ResetTokens"("id");

-- AddForeignKey
ALTER TABLE "ResetTokens" ADD CONSTRAINT "ResetTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Auth"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

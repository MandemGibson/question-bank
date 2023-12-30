-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Otp_id_key" ON "Otp"("id");

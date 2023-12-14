-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "image" BYTEA;

-- CreateTable
CREATE TABLE "SuperAdmin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 7832,

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("id")
);

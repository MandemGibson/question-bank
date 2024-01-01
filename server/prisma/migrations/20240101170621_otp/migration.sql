/*
  Warnings:

  - You are about to drop the column `email` on the `Otp` table. All the data in the column will be lost.
  - Added the required column `staffId` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "email",
ADD COLUMN     "staffId" TEXT NOT NULL;

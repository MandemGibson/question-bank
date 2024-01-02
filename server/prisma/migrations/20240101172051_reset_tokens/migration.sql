/*
  Warnings:

  - Added the required column `token` to the `ResetTokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResetTokens" ADD COLUMN     "token" TEXT NOT NULL;

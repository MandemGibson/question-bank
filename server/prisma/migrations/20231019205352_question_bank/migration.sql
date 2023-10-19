/*
  Warnings:

  - Added the required column `deadline` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;

/*
  Warnings:

  - Added the required column `title` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Results" ADD COLUMN     "title" TEXT NOT NULL;

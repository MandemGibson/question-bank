/*
  Warnings:

  - You are about to drop the column `topicId` on the `AnswerChoice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnswerChoice" DROP CONSTRAINT "AnswerChoice_topicId_fkey";

-- AlterTable
ALTER TABLE "AnswerChoice" DROP COLUMN "topicId";

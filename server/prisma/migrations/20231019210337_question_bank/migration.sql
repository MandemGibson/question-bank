/*
  Warnings:

  - You are about to drop the column `questionId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_questionId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "questionId",
ADD COLUMN     "topicId" TEXT;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

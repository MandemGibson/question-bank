/*
  Warnings:

  - You are about to drop the column `questionTextId` on the `AnswerChoice` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `staffId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `timeLimit` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `QuestionText` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `topicId` to the `AnswerChoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AnswerChoice" DROP CONSTRAINT "AnswerChoice_questionId_fkey";

-- DropForeignKey
ALTER TABLE "AnswerChoice" DROP CONSTRAINT "AnswerChoice_questionTextId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_classId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_staffId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionText" DROP CONSTRAINT "QuestionText_questionId_fkey";

-- AlterTable
ALTER TABLE "AnswerChoice" DROP COLUMN "questionTextId",
ADD COLUMN     "topicId" INTEGER NOT NULL,
ALTER COLUMN "questionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "categoryId",
DROP COLUMN "classId",
DROP COLUMN "staffId",
DROP COLUMN "timeLimit",
DROP COLUMN "title",
ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "topicId" INTEGER;

-- DropTable
DROP TABLE "QuestionText";

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "staffId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'No title',
    "timeLimit" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerChoice" ADD CONSTRAINT "AnswerChoice_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerChoice" ADD CONSTRAINT "AnswerChoice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

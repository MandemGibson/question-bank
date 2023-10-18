/*
  Warnings:

  - You are about to drop the column `question` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnswerChoice" ADD COLUMN     "questionTextId" INTEGER;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "question";

-- CreateTable
CREATE TABLE "QuestionText" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "questionId" INTEGER,

    CONSTRAINT "QuestionText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionText" ADD CONSTRAINT "QuestionText_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerChoice" ADD CONSTRAINT "AnswerChoice_questionTextId_fkey" FOREIGN KEY ("questionTextId") REFERENCES "QuestionText"("id") ON DELETE SET NULL ON UPDATE CASCADE;

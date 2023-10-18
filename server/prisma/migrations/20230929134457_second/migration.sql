-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "timeLimit" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'No title';

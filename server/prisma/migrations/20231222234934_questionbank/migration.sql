/*
  Warnings:

  - You are about to drop the column `staffId` on the `Sessions` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Sessions" DROP CONSTRAINT "Sessions_staffId_fkey";

-- DropForeignKey
ALTER TABLE "Sessions" DROP CONSTRAINT "Sessions_studentId_fkey";

-- AlterTable
ALTER TABLE "Sessions" DROP COLUMN "staffId",
DROP COLUMN "studentId";

-- CreateIndex
CREATE UNIQUE INDEX "staff_sessions_pk" ON "Sessions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "student_sessions_pk" ON "Sessions"("userId");

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "staff_auth_fk" FOREIGN KEY ("userId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "student_auth_fk" FOREIGN KEY ("userId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "staff_sessions_fk" ON "Staff"("id");

-- CreateIndex
CREATE UNIQUE INDEX "student_sessions_fk" ON "Student"("id");

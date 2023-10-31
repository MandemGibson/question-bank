/*
  Warnings:

  - You are about to drop the column `academic_year_id` on the `StaffSubject` table. All the data in the column will be lost.
  - You are about to drop the column `class_id` on the `StaffSubject` table. All the data in the column will be lost.
  - You are about to drop the column `staff_id` on the `StaffSubject` table. All the data in the column will be lost.
  - You are about to drop the column `term_id` on the `StaffSubject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StaffSubject" DROP CONSTRAINT "StaffSubject_academicYearId_fkey";

-- DropForeignKey
ALTER TABLE "StaffSubject" DROP CONSTRAINT "StaffSubject_termId_fkey";

-- AlterTable
ALTER TABLE "StaffSubject" DROP COLUMN "academic_year_id",
DROP COLUMN "class_id",
DROP COLUMN "staff_id",
DROP COLUMN "term_id",
ALTER COLUMN "code" DROP NOT NULL,
ALTER COLUMN "academicYearId" DROP NOT NULL,
ALTER COLUMN "termId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StaffSubject" ADD CONSTRAINT "StaffSubject_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffSubject" ADD CONSTRAINT "StaffSubject_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE SET NULL ON UPDATE CASCADE;

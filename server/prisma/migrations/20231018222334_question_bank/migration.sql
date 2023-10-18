/*
  Warnings:

  - The primary key for the `AcademicYear` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `AnswerChoice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Guardian` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `topicId` on the `Question` table. All the data in the column will be lost.
  - The primary key for the `Results` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Staff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StaffSubject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Term` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Topic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "AnswerChoice" DROP CONSTRAINT "AnswerChoice_questionId_fkey";

-- DropForeignKey
ALTER TABLE "AnswerChoice" DROP CONSTRAINT "AnswerChoice_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Guardian" DROP CONSTRAINT "Guardian_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StaffSubject" DROP CONSTRAINT "StaffSubject_academicYearId_fkey";

-- DropForeignKey
ALTER TABLE "StaffSubject" DROP CONSTRAINT "StaffSubject_termId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_classId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_staffId_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToStaff" DROP CONSTRAINT "_ClassToStaff_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToStaff" DROP CONSTRAINT "_ClassToStaff_B_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToStaffSubject" DROP CONSTRAINT "_ClassToStaffSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToStaffSubject" DROP CONSTRAINT "_ClassToStaffSubject_B_fkey";

-- DropForeignKey
ALTER TABLE "_StaffToStaffSubject" DROP CONSTRAINT "_StaffToStaffSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_StaffToStaffSubject" DROP CONSTRAINT "_StaffToStaffSubject_B_fkey";

-- AlterTable
ALTER TABLE "AcademicYear" DROP CONSTRAINT "AcademicYear_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "AcademicYear_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AcademicYear_id_seq";

-- AlterTable
ALTER TABLE "AnswerChoice" DROP CONSTRAINT "AnswerChoice_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "questionId" SET DATA TYPE TEXT,
ALTER COLUMN "topicId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AnswerChoice_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AnswerChoice_id_seq";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Category_id_seq";

-- AlterTable
ALTER TABLE "Class" DROP CONSTRAINT "Class_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Class_id_seq";

-- AlterTable
ALTER TABLE "Guardian" DROP CONSTRAINT "Guardian_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "studentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Guardian_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Guardian_id_seq";

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
DROP COLUMN "topicId",
ADD COLUMN     "questionId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Question_id_seq";

-- AlterTable
ALTER TABLE "Results" DROP CONSTRAINT "Results_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ALTER COLUMN "studentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Results_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Results_id_seq";

-- AlterTable
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Staff_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Staff_id_seq";

-- AlterTable
ALTER TABLE "StaffSubject" DROP CONSTRAINT "StaffSubject_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "academicYearId" SET DATA TYPE TEXT,
ALTER COLUMN "termId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StaffSubject_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StaffSubject_id_seq";

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "classId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Student_id_seq";

-- AlterTable
ALTER TABLE "Term" DROP CONSTRAINT "Term_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Term_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Term_id_seq";

-- AlterTable
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "staffId" SET DATA TYPE TEXT,
ALTER COLUMN "classId" SET DATA TYPE TEXT,
ALTER COLUMN "title" DROP DEFAULT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Topic_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Topic_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "_ClassToStaff" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ClassToStaffSubject" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_StaffToStaffSubject" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guardian" ADD CONSTRAINT "Guardian_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffSubject" ADD CONSTRAINT "StaffSubject_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffSubject" ADD CONSTRAINT "StaffSubject_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerChoice" ADD CONSTRAINT "AnswerChoice_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerChoice" ADD CONSTRAINT "AnswerChoice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StaffToStaffSubject" ADD CONSTRAINT "_StaffToStaffSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StaffToStaffSubject" ADD CONSTRAINT "_StaffToStaffSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "StaffSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToStaffSubject" ADD CONSTRAINT "_ClassToStaffSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToStaffSubject" ADD CONSTRAINT "_ClassToStaffSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "StaffSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToStaff" ADD CONSTRAINT "_ClassToStaff_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToStaff" ADD CONSTRAINT "_ClassToStaff_B_fkey" FOREIGN KEY ("B") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

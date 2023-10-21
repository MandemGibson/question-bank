/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[staff_id]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staff_id,id]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,student_id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `staff_id` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Guardian" DROP CONSTRAINT "Guardian_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_studentId_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "role" INTEGER NOT NULL DEFAULT 9291;

-- AlterTable
ALTER TABLE "Guardian" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Results" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Sessions" ADD COLUMN     "valid" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "role" INTEGER NOT NULL DEFAULT 3921,
ADD COLUMN     "staff_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
ADD COLUMN     "role" INTEGER NOT NULL DEFAULT 6631,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Student_id_seq";

-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "staff_id" TEXT,
    "student_id" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_id_key" ON "Auth"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userId_key" ON "Auth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "staff_auth_pk" ON "Auth"("staff_id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "student_auth_pk" ON "Auth"("student_id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_staff_id_key" ON "Staff"("staff_id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_auth_fk" ON "Staff"("staff_id", "id");

-- CreateIndex
CREATE UNIQUE INDEX "student_auth_fk" ON "Student"("id", "student_id");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "staff_auth_fk" FOREIGN KEY ("staff_id", "userId") REFERENCES "Staff"("id", "staff_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "student_auth_fk" FOREIGN KEY ("student_id", "userId") REFERENCES "Student"("id", "student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guardian" ADD CONSTRAINT "Guardian_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

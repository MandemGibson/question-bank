/*
  Warnings:

  - You are about to drop the column `profile_pic` on the `Student` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Student_profile_pic_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "profile_pic";

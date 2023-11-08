/*
  Warnings:

  - You are about to drop the column `student_id` on the `Guardian` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `Guardian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Guardian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `Guardian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guardian" DROP COLUMN "student_id",
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "middlename" TEXT,
ADD COLUMN     "occupation" TEXT NOT NULL;

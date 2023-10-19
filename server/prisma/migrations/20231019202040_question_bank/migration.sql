/*
  Warnings:

  - You are about to drop the column `staff_id` on the `Staff` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Staff_staff_id_key";

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "staff_id";

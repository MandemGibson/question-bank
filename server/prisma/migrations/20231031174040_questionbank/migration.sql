/*
  Warnings:

  - You are about to drop the `_ClassToStaff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClassToStaff" DROP CONSTRAINT "_ClassToStaff_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToStaff" DROP CONSTRAINT "_ClassToStaff_B_fkey";

-- DropTable
DROP TABLE "_ClassToStaff";

-- CreateTable
CREATE TABLE "_StaffClasses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StaffClasses_AB_unique" ON "_StaffClasses"("A", "B");

-- CreateIndex
CREATE INDEX "_StaffClasses_B_index" ON "_StaffClasses"("B");

-- AddForeignKey
ALTER TABLE "_StaffClasses" ADD CONSTRAINT "_StaffClasses_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StaffClasses" ADD CONSTRAINT "_StaffClasses_B_fkey" FOREIGN KEY ("B") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

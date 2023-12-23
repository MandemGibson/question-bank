-- AlterTable
ALTER TABLE "Sessions" ADD COLUMN     "staffId" TEXT,
ADD COLUMN     "studentId" TEXT;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "Sessions" DROP CONSTRAINT "staff_auth_fk";

-- DropForeignKey
ALTER TABLE "Sessions" DROP CONSTRAINT "student_auth_fk";

-- DropIndex
DROP INDEX "staff_sessions_pk";

-- DropIndex
DROP INDEX "student_sessions_pk";

-- DropIndex
DROP INDEX "staff_sessions_fk";

-- DropIndex
DROP INDEX "student_sessions_fk";

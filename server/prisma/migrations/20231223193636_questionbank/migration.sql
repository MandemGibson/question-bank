/*
  Warnings:

  - A unique constraint covering the columns `[topicId]` on the table `CompletedTopics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `CompletedTopics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CompletedTopics_topicId_key" ON "CompletedTopics"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "CompletedTopics_studentId_key" ON "CompletedTopics"("studentId");

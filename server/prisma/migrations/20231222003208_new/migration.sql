-- CreateTable
CREATE TABLE "CompletedTopics" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "CompletedTopics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompletedTopics" ADD CONSTRAINT "CompletedTopics_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedTopics" ADD CONSTRAINT "CompletedTopics_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `websiteCreatedAt` on the `clientProjects` table. All the data in the column will be lost.
  - Added the required column `projectName` to the `clientProjects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientProjects" DROP COLUMN "websiteCreatedAt",
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "projectName" TEXT NOT NULL,
ADD COLUMN     "projectUrl" TEXT,
ALTER COLUMN "startedAt" SET DEFAULT CURRENT_TIMESTAMP;

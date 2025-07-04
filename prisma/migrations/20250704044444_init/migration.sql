/*
  Warnings:

  - You are about to drop the column `aiSummary` on the `PullRequest` table. All the data in the column will be lost.
  - You are about to drop the column `diff` on the `PullRequest` table. All the data in the column will be lost.
  - You are about to drop the column `prBody` on the `PullRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[prId]` on the table `PullRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `baseBranch` to the `PullRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headBranch` to the `PullRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prId` to the `PullRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `PullRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `PullRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PullRequest" DROP COLUMN "aiSummary",
DROP COLUMN "diff",
DROP COLUMN "prBody",
ADD COLUMN     "baseBranch" TEXT NOT NULL,
ADD COLUMN     "headBranch" TEXT NOT NULL,
ADD COLUMN     "prId" INTEGER NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PullRequest_prId_key" ON "PullRequest"("prId");

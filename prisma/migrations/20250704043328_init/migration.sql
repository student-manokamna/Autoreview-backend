/*
  Warnings:

  - The primary key for the `PullRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `baseBranch` on the `PullRequest` table. All the data in the column will be lost.
  - You are about to drop the column `diffText` on the `PullRequest` table. All the data in the column will be lost.
  - You are about to drop the column `headBranch` on the `PullRequest` table. All the data in the column will be lost.
  - The `id` column on the `PullRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PullRequest" DROP CONSTRAINT "PullRequest_pkey",
DROP COLUMN "baseBranch",
DROP COLUMN "diffText",
DROP COLUMN "headBranch",
ADD COLUMN     "diff" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PullRequest_pkey" PRIMARY KEY ("id");

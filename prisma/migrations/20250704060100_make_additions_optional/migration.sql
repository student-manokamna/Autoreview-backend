-- AlterTable
ALTER TABLE "PullRequest" ALTER COLUMN "additions" DROP NOT NULL,
ALTER COLUMN "deletions" DROP NOT NULL;

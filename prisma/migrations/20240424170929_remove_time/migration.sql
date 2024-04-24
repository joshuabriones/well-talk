/*
  Warnings:

  - You are about to drop the column `replyTime` on the `inquiry` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `inquiry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inquiry` DROP COLUMN `replyTime`,
    DROP COLUMN `time`;

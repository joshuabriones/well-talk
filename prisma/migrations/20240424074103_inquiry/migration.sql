/*
  Warnings:

  - Added the required column `message` to the `inquiry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inquiry` ADD COLUMN `counselorId` INTEGER NULL,
    ADD COLUMN `counselorReply` VARCHAR(191) NULL,
    ADD COLUMN `message` VARCHAR(191) NOT NULL,
    ADD COLUMN `replyDate` DATETIME(3) NULL,
    ADD COLUMN `replyTime` DATETIME(3) NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'open';

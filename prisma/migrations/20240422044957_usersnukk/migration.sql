/*
  Warnings:

  - You are about to drop the column `middleName` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `student` MODIFY `college` VARCHAR(191) NULL,
    MODIFY `program` VARCHAR(191) NULL,
    MODIFY `year` INTEGER NULL,
    MODIFY `birthDate` DATETIME(3) NULL,
    MODIFY `contactNumber` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `teacher` MODIFY `college` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `middleName`,
    MODIFY `idNumber` VARCHAR(191) NULL,
    MODIFY `gender` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL;

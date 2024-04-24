/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.
  - A unique constraint covering the columns `[institutionalEmail]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `college` on table `student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `program` on table `student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthDate` on table `student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `college` on table `teacher` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `institutionalEmail` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `idNumber` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_institutionalEmail_key` ON `user`;

-- AlterTable
ALTER TABLE `student` MODIFY `college` VARCHAR(191) NOT NULL,
    MODIFY `program` VARCHAR(191) NOT NULL,
    MODIFY `year` INTEGER NOT NULL,
    MODIFY `birthDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `teacher` MODIFY `college` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    ADD COLUMN `institutionalEmail` VARCHAR(255) NOT NULL,
    MODIFY `idNumber` VARCHAR(191) NOT NULL,
    MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL,
    MODIFY `gender` ENUM('male', 'female') NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('counselor', 'teacher', 'student') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `institutionalEmail` ON `user`(`institutionalEmail`);

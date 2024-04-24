/*
  Warnings:

  - You are about to drop the column `institutionalEmail` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `idNumber` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_institutionalEmail_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `institutionalEmail`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    MODIFY `idNumber` VARCHAR(191) NOT NULL,
    MODIFY `image` VARCHAR(191) NULL,
    MODIFY `role` ENUM('counselor', 'teacher', 'student') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_institutionalEmail_key` ON `user`(`email`);

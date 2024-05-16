/*
  Warnings:

  - You are about to drop the column `author` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `blogURL` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `post` table. All the data in the column will be lost.
  - Added the required column `postContent` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `author`,
    DROP COLUMN `blogURL`,
    DROP COLUMN `shortDescription`,
    DROP COLUMN `title`,
    ADD COLUMN `dateModified` DATETIME(0) NULL,
    ADD COLUMN `postContent` VARCHAR(191) NOT NULL;

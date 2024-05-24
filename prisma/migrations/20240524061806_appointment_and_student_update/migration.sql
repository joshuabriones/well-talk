/*
  Warnings:

  - You are about to alter the column `status` on the `appointment` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to drop the column `address` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `appointment` MODIFY `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `address`,
    ADD COLUMN `barangay` VARCHAR(191) NULL,
    ADD COLUMN `cityMunicipality` VARCHAR(191) NULL,
    ADD COLUMN `province` VARCHAR(191) NULL,
    ADD COLUMN `specificAddress` VARCHAR(191) NULL,
    ADD COLUMN `zipcode` VARCHAR(191) NULL;

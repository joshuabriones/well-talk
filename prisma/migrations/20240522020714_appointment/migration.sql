/*
  Warnings:

  - You are about to drop the column `calendarId` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the `calendar` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `appointmentType` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_calendarId_fkey`;

-- DropForeignKey
ALTER TABLE `calendar` DROP FOREIGN KEY `Calendar_userId_fkey`;

-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_calendarId_fkey`;

-- AlterTable
ALTER TABLE `appointment` DROP COLUMN `calendarId`,
    ADD COLUMN `appointmentType` VARCHAR(191) NOT NULL,
    ADD COLUMN `counselorId` INTEGER NULL,
    ADD COLUMN `studentId` INTEGER NULL,
    MODIFY `purpose` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `calendar`;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `Appointment_counselorId_fkey` FOREIGN KEY (`counselorId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `Appointment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

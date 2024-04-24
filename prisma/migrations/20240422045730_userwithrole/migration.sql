-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('teacher', 'counselor', 'student') NULL;

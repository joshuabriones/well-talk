-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('counselor', 'teacher', 'student', 'user') NOT NULL DEFAULT 'user';

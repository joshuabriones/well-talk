-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('counselor', 'teacher', 'student', 'admin') NOT NULL;

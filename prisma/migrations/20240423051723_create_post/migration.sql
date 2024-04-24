-- CreateTable
CREATE TABLE `post` (
    `postId` INTEGER NOT NULL AUTO_INCREMENT,
    `posts` TEXT NULL,
    `title` VARCHAR(255) NULL,
    `shortDescription` TEXT NULL,
    `blogURL` VARCHAR(255) NULL,
    `author` VARCHAR(255) NULL,
    `publishDate` DATETIME(0) NULL,
    `image` VARCHAR(1024) NULL,
    `datePosted` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isdeleted` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

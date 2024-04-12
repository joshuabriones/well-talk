-- CreateTable
CREATE TABLE `post` (
    `postId` INTEGER NOT NULL AUTO_INCREMENT,
    `blogId` INTEGER NOT NULL,
    `posts` TEXT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `shortDescription` TEXT NOT NULL,
    `blogURL` VARCHAR(255) NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `publishDate` DATETIME(0) NOT NULL,
    `image` BLOB NULL,
    `datePosted` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isdeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

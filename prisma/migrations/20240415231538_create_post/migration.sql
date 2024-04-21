-- CreateTable
CREATE TABLE `post` (
    `postId` INTEGER NOT NULL AUTO_INCREMENT,
    `blogId` INTEGER,
    `posts` TEXT,
    `title` VARCHAR(255),
    `shortDescription` TEXT,
    `blogURL` VARCHAR(255),
    `author` VARCHAR(255),
    `publishDate` DATETIME(0),
    `image` VARCHAR(255) NULL,
    `datePosted` DATETIME(0) DEFAULT CURRENT_TIMESTAMP(0),
    `isdeleted` BOOLEAN DEFAULT false,

    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

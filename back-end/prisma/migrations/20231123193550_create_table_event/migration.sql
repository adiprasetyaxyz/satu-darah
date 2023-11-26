-- CreateTable
CREATE TABLE `events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bloodProvider` VARCHAR(100) NOT NULL,
    `region` VARCHAR(100) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `time` VARCHAR(100) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `registered` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

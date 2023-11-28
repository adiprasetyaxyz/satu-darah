-- AlterTable
ALTER TABLE `registers` MODIFY `bloodType` VARCHAR(100) NULL;

-- CreateTable
CREATE TABLE `blood_providers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `providerName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packed_red_cell` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
    `O` INTEGER NOT NULL,
    `AB` INTEGER NOT NULL,
    `providerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trombocyte_concentrate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
    `O` INTEGER NOT NULL,
    `AB` INTEGER NOT NULL,
    `providerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fresh_frozen_plasma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
    `O` INTEGER NOT NULL,
    `AB` INTEGER NOT NULL,
    `providerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cryoprecipitated_ahf` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
    `O` INTEGER NOT NULL,
    `AB` INTEGER NOT NULL,
    `providerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leucodepleted` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
    `O` INTEGER NOT NULL,
    `AB` INTEGER NOT NULL,
    `providerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `packed_red_cell` ADD CONSTRAINT `packed_red_cell_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `blood_providers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trombocyte_concentrate` ADD CONSTRAINT `trombocyte_concentrate_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `blood_providers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fresh_frozen_plasma` ADD CONSTRAINT `fresh_frozen_plasma_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `blood_providers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cryoprecipitated_ahf` ADD CONSTRAINT `cryoprecipitated_ahf_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `blood_providers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leucodepleted` ADD CONSTRAINT `leucodepleted_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `blood_providers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

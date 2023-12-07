/*
  Warnings:

  - You are about to drop the column `providerId` on the `leucodepleted` table. All the data in the column will be lost.
  - You are about to drop the `blood_providers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cryoprecipitated_ahf` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fresh_frozen_plasma` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `packed_red_cell` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trombocyte_concentrate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bloodProviderId` to the `Leucodepleted` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cryoprecipitated_ahf` DROP FOREIGN KEY `cryoprecipitated_ahf_providerId_fkey`;

-- DropForeignKey
ALTER TABLE `fresh_frozen_plasma` DROP FOREIGN KEY `fresh_frozen_plasma_providerId_fkey`;

-- DropForeignKey
ALTER TABLE `leucodepleted` DROP FOREIGN KEY `leucodepleted_providerId_fkey`;

-- DropForeignKey
ALTER TABLE `packed_red_cell` DROP FOREIGN KEY `packed_red_cell_providerId_fkey`;

-- DropForeignKey
ALTER TABLE `trombocyte_concentrate` DROP FOREIGN KEY `trombocyte_concentrate_providerId_fkey`;

-- AlterTable
ALTER TABLE `leucodepleted` DROP COLUMN `providerId`,
    ADD COLUMN `bloodProviderId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `blood_providers`;

-- DropTable
DROP TABLE `cryoprecipitated_ahf`;

-- DropTable
DROP TABLE `fresh_frozen_plasma`;

-- DropTable
DROP TABLE `packed_red_cell`;

-- DropTable
DROP TABLE `trombocyte_concentrate`;

-- CreateTable
CREATE TABLE `BloodProvider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `providerName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackedRedCell` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
    `O` INTEGER NOT NULL,
    `AB` INTEGER NOT NULL,
    `bloodProviderId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrombocyteConcentrate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
    `O` INTEGER NOT NULL,
    `AB` INTEGER NOT NULL,
    `bloodProviderId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FreshFrozenPlasma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
    `O` INTEGER NOT NULL,
    `AB` INTEGER NOT NULL,
    `bloodProviderId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CryoprecipitatedAHF` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
    `O` INTEGER NOT NULL,
    `AB` INTEGER NOT NULL,
    `bloodProviderId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PackedRedCell` ADD CONSTRAINT `PackedRedCell_bloodProviderId_fkey` FOREIGN KEY (`bloodProviderId`) REFERENCES `BloodProvider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrombocyteConcentrate` ADD CONSTRAINT `TrombocyteConcentrate_bloodProviderId_fkey` FOREIGN KEY (`bloodProviderId`) REFERENCES `BloodProvider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FreshFrozenPlasma` ADD CONSTRAINT `FreshFrozenPlasma_bloodProviderId_fkey` FOREIGN KEY (`bloodProviderId`) REFERENCES `BloodProvider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CryoprecipitatedAHF` ADD CONSTRAINT `CryoprecipitatedAHF_bloodProviderId_fkey` FOREIGN KEY (`bloodProviderId`) REFERENCES `BloodProvider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leucodepleted` ADD CONSTRAINT `Leucodepleted_bloodProviderId_fkey` FOREIGN KEY (`bloodProviderId`) REFERENCES `BloodProvider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

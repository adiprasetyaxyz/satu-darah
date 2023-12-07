/*
  Warnings:

  - You are about to drop the `bloodprovider` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cryoprecipitatedahf` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `freshfrozenplasma` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `leucodepleted` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `packedredcell` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trombocyteconcentrate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cryoprecipitatedahf` DROP FOREIGN KEY `CryoprecipitatedAHF_bloodProviderId_fkey`;

-- DropForeignKey
ALTER TABLE `freshfrozenplasma` DROP FOREIGN KEY `FreshFrozenPlasma_bloodProviderId_fkey`;

-- DropForeignKey
ALTER TABLE `leucodepleted` DROP FOREIGN KEY `Leucodepleted_bloodProviderId_fkey`;

-- DropForeignKey
ALTER TABLE `packedredcell` DROP FOREIGN KEY `PackedRedCell_bloodProviderId_fkey`;

-- DropForeignKey
ALTER TABLE `trombocyteconcentrate` DROP FOREIGN KEY `TrombocyteConcentrate_bloodProviderId_fkey`;

-- DropTable
DROP TABLE `bloodprovider`;

-- DropTable
DROP TABLE `cryoprecipitatedahf`;

-- DropTable
DROP TABLE `freshfrozenplasma`;

-- DropTable
DROP TABLE `leucodepleted`;

-- DropTable
DROP TABLE `packedredcell`;

-- DropTable
DROP TABLE `trombocyteconcentrate`;

-- CreateTable
CREATE TABLE `bloodStocks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `providerName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `packedRedCells` JSON NOT NULL,
    `trombocyteConcentrate` JSON NOT NULL,
    `freshFrozenPlasma` JSON NOT NULL,
    `cryoprecipitatedAHF` JSON NOT NULL,
    `leucodepleted` JSON NOT NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bloodStocks` ADD CONSTRAINT `bloodStocks_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

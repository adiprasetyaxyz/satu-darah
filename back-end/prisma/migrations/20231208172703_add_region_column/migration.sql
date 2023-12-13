/*
  Warnings:

  - Added the required column `region` to the `bloodStocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bloodstocks` ADD COLUMN `region` VARCHAR(191) NOT NULL;

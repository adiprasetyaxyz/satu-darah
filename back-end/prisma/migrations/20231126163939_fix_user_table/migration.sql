/*
  Warnings:

  - You are about to drop the column `organizerId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `registers` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - Added the required column `username` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `registers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_participants` DROP FOREIGN KEY `_participants_B_fkey`;

-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_organizerId_fkey`;

-- DropForeignKey
ALTER TABLE `registers` DROP FOREIGN KEY `registers_userId_fkey`;

-- DropIndex
DROP INDEX `users_username_key` ON `users`;

-- AlterTable
ALTER TABLE `_participants` MODIFY `B` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `events` DROP COLUMN `organizerId`,
    ADD COLUMN `username` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `registers` DROP COLUMN `userId`,
    ADD COLUMN `username` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`username`);

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `registers` ADD CONSTRAINT `registers_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_participants` ADD CONSTRAINT `_participants_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

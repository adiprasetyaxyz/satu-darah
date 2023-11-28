/*
  Warnings:

  - Added the required column `username` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `username` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

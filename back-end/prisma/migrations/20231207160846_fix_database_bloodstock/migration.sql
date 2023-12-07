-- AlterTable
ALTER TABLE `bloodstocks` MODIFY `packedRedCells` JSON NULL,
    MODIFY `trombocyteConcentrate` JSON NULL,
    MODIFY `freshFrozenPlasma` JSON NULL,
    MODIFY `cryoprecipitatedAHF` JSON NULL,
    MODIFY `leucodepleted` JSON NULL;

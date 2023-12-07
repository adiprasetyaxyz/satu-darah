// bloodStockService.js

import { prismaClient } from '../application/database.js';
import validate from '../validation/validation.js';
import { bloodStockValidation } from '../validation/stock-validation.js';
import ResponseError from '../error/response-error.js';

const createStock = async (user, request) => {
  const bloodstockData = validate(bloodStockValidation, request);

  return prismaClient.bloodStock.create({
    data: bloodstockData,
    select: {
      id: true,
      providerName: true,
      address: true,
      phoneNumber: true,
      packedRedCells: true,
      trombocyteConcentrate: true,
      freshFrozenPlasma: true,
      cryoprecipitatedAHF: true,
      leucodepleted: true,
      username: true,
    },
  });
};
const getAllBloodstock = async () => {
  const bloodstock = await prismaClient.bloodStock.findMany({
    select: {
      id: true,
      providerName: true,
      address: true,
      phoneNumber: true,
      packedRedCells: true,
      trombocyteConcentrate: true,
      freshFrozenPlasma: true,
      cryoprecipitatedAHF: true,
      leucodepleted: true,
      username: true,
      // Tambahkan properti lain yang ingin Anda pilih
    },
  });

  return bloodstock;
};

const updateStock = async (bloodstockId, updatedBloodstockData) => {
  const updatedBloodstock = await prismaClient.bloodStock.update({
    where: {
      id: bloodstockId,
    },
    data: updatedBloodstockData,
    select: {
      id: true,
      providerName: true,
      address: true,
      phoneNumber: true,
      packedRedCells: true,
      trombocyteConcentrate: true,
      freshFrozenPlasma: true,
      cryoprecipitatedAHF: true,
      leucodepleted: true,
      username: true,
      // Tambahkan properti lain yang ingin Anda perbarui
    },
  });

  if (!updatedBloodstock) {
    throw new ResponseError(404, 'Bloodstock not found');
  }

  return updatedBloodstock;
};

const deleteStock = async (bloodstockId) => {
  const deletedBloodstock = await prismaClient.bloodStock.delete({
    where: {
      id: bloodstockId,
    },
  });

  if (!deletedBloodstock) {
    throw new ResponseError(404, 'Bloodstock not found');
  }

  return deletedBloodstock;
};
export default {
  createStock,
  getAllBloodstock,
  updateStock,
  deleteStock,
};

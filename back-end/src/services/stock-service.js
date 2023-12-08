// bloodStockService.js

import { prismaClient } from '../application/database.js';
import validate from '../validation/validation.js';
import { bloodStockValidation } from '../validation/stock-validation.js';
import ResponseError from '../error/response-error.js';

const createStock = async (user, request, username) => {
  const bloodstockData = validate(bloodStockValidation, request);
  return prismaClient.bloodStock.create({
    data: {
      ...bloodstockData, // Memasukkan data dari request
      username, // Mengisi username dari objek user
    },
    select: {
      id: true,
      providerName: true,
      address: true,
      region: true,
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
      region: true,
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
      region: true,
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

const searchStock = async (region, provider) => {
  let bloodstock;

  if (region) {
    bloodstock = await prismaClient.bloodStock.findMany({
      where: {
        // Pencarian berdasarkan region
        // Sesuaikan 'namaFieldRegion' dengan nama kolom region pada tabel di database Anda
        region: { contains: region },
      },
      select: {
        // Properti yang ingin Anda pilih
        id: true,
        providerName: true,
        address: true,
        region: true,
        phoneNumber: true,
        packedRedCells: true,
        trombocyteConcentrate: true,
        freshFrozenPlasma: true,
        cryoprecipitatedAHF: true,
        leucodepleted: true,
        username: true,
      },
    });
  } else if (provider) {
    bloodstock = await prismaClient.bloodStock.findMany({
      where: {
        // Pencarian berdasarkan provider
        // Sesuaikan 'namaFieldProvider' dengan nama kolom provider pada tabel di database Anda
        providerName: { contains: provider },
      },
      select: {
        // Properti yang ingin Anda pilih
        id: true,
        providerName: true,
        address: true,
        region: true,
        phoneNumber: true,
        packedRedCells: true,
        trombocyteConcentrate: true,
        freshFrozenPlasma: true,
        cryoprecipitatedAHF: true,
        leucodepleted: true,
        username: true,
      },
    });
  } else {
    // Jika tidak ada kriteria pencarian yang diberikan, ambil semua data
    bloodstock = await prismaClient.bloodStock.findMany({
      select: {
        // Properti yang ingin Anda pilih
        id: true,
        providerName: true,
        address: true,
        region: true,
        phoneNumber: true,
        packedRedCells: true,
        trombocyteConcentrate: true,
        freshFrozenPlasma: true,
        cryoprecipitatedAHF: true,
        leucodepleted: true,
        username: true,
      },
    });
  }

  return bloodstock;
};

export default {
  createStock,
  getAllBloodstock,
  updateStock,
  deleteStock,
  searchStock,
};

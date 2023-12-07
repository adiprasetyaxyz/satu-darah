// bloodStockController.js

import ResponseError from '../error/response-error.js';
import bloodStockService from '../services/stock-service.js';

const create = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.accountType !== 'Provider') {
      throw new ResponseError(403, 'Only Provider accounts can create bloodstock');
    }
    const request = req.body;
    const result = await bloodStockService.createStock(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await bloodStockService.getAllBloodstock();
    // Memanggil fungsi getAllEvents dari eventService
    res.status(200).json({
      bloodStock: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { bloodstockId } = req.params;
    const bloodstockIdInt = parseInt(bloodstockId, 10);
    const updatedData = req.body;
    const updatedBloodstock = await bloodStockService.updateStock(bloodstockIdInt, updatedData);
    res.status(200).json({
      data: updatedBloodstock,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { bloodstockId } = req.params;
    const bloodstockIdInt = parseInt(bloodstockId, 10);
    const deletedBloodstock = await bloodStockService.deleteStock(bloodstockIdInt);
    res.status(200).json({
      message: 'Bloodstock deleted successfully',
      data: deletedBloodstock,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  getAll,
  update,
  remove,
};

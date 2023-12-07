import registerService from '../services/register-service.js';

const createRegister = async (req, res, next) => {
  try {
    const { username } = req.user;
    const { eventId } = req.params;
    const parsedEventId = parseInt(eventId, 10);
    const { bloodType } = req.body;
    const result = await registerService.createRegister(bloodType, username, parsedEventId);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllRegisters = async (req, res, next) => {
  try {
    const result = await registerService.getAllRegisters();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getRegister = async (req, res, next) => {
  try {
    const { registerId } = req.params;
    const parsedRegisterId = parseInt(registerId, 10);
    const result = await registerService.getRegister(parsedRegisterId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateRegister = async (req, res, next) => {
  try {
    const { registerId } = req.params;
    const parsedRegisterId = parseInt(registerId, 10);
    const updatedData = req.body;
    const result = await registerService.updateRegister(parsedRegisterId, updatedData);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRegister = async (req, res, next) => {
  try {
    const { registerId } = req.params;
    const parsedRegisterId = parseInt(registerId, 10);
    const result = await registerService.deleteRegister(parsedRegisterId);
    res.status(200).json({
      message: 'Register deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createRegister,
  getAllRegisters,
  getRegister,
  updateRegister,
  deleteRegister,
};

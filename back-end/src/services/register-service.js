import { prismaClient } from '../application/database.js';
import { registerValidationSchema } from '../validation/register-validation.js';
import ResponseError from '../error/response-error.js';

const createRegister = async (bloodType, username, eventId) => {
  const validation = registerValidationSchema.validate({ bloodType, username, eventId });
  if (validation.error) {
    throw new ResponseError(400, validation.error.details[0].message);
  }

  return prismaClient.register.create({
    data: {
      bloodType,
      username,
      eventId,
    },
  });
};

const getAllRegisters = async () => prismaClient.register.findMany();

const getRegister = async (registerId) => {
  const register = await prismaClient.register.findUnique({
    where: {
      id: registerId,
    },
  });

  if (!register) {
    throw new ResponseError(404, 'Register not found');
  }

  return register;
};

const updateRegister = async (registerId, updatedRegisterData) => prismaClient.register.update({
  where: {
    id: registerId,
  },
  data: updatedRegisterData,
});

const deleteRegister = async (registerId) => prismaClient.register.delete({
  where: {
    id: registerId,
  },
});

export default {
  createRegister,
  getAllRegisters,
  getRegister,
  updateRegister,
  deleteRegister,
};

import { createEventValidation } from '../validation/event-validation.js';
import validate from '../validation/validation.js';
import { prismaClient } from '../application/database.js';

const create = async (user, request) => {
  const event = validate(createEventValidation, request);

  return prismaClient.event.create({
    data: event,
    select: {
      id: true,
      bloodProvider: true,
      region: true,
      date: true,
      time: true,
      location: true,
      capacity: true,
      registered: true,
      username: true,
    },
  });
};

export default {
  create,
};

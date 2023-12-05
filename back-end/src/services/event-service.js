import { createEventValidation, getEventValidation } from '../validation/event-validation.js';
import validate from '../validation/validation.js';
import { prismaClient } from '../application/database.js';
import ResponseError from '../error/response-error.js';

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

const get = async (user, eventId) => {
  // eslint-disable-next-line no-param-reassign
  eventId = validate(getEventValidation, eventId);

  const event = await prismaClient.event.findFirst({
    where: {
      username: user.username,
      id: eventId,
    },
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
  if (!event) {
    throw new ResponseError(404, 'event is not found');
  }
  return event;
};

const getAllEvents = async () => {
  const events = await prismaClient.event.findMany({
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

  return events;
};

export default {
  create,
  get,
  getAllEvents,
};

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

const deleteEvent = async (eventId) => {
  const deletedEvent = await prismaClient.event.delete({
    where: {
      id: eventId,
    },
  });

  if (!deletedEvent) {
    throw new ResponseError(404, 'Event not found');
  }

  return deletedEvent;
};

const searchEvents = async (region, bloodProvider) => {
  let events;

  if (region) {
    events = await prismaClient.event.findMany({
      where: {
        region: { contains: region },
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
  } else if (bloodProvider) {
    events = await prismaClient.event.findMany({
      where: {
        bloodProvider: { contains: bloodProvider },
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
  } else {
    // Jika tidak ada kriteria pencarian yang diberikan, ambil semua data
    events = await prismaClient.bloodStock.findMany({
      select: {
        // Properti yang ingin Anda pilih
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
  }

  return events;
};

export default {
  create,
  get,
  getAllEvents,
  deleteEvent,
  searchEvents,
};

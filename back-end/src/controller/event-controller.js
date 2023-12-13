import ResponseError from '../error/response-error.js';
import eventService from '../services/event-service.js';

const create = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.accountType !== 'Provider') {
      throw new ResponseError(403, 'Only Provider accounts can create events');
    }
    const request = req.body;
    const result = await eventService.create(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const result = await eventService.get(eventId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};
const getAllEvents = async (req, res, next) => {
  try {
    const result = await eventService.getAllEvents();
    // Memanggil fungsi getAllEvents dari eventService
    res.status(200).json({
      events: result,
    });
  } catch (e) {
    next(e);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.accountType !== 'Provider') {
      throw new ResponseError(403, 'Only Provider accounts can delete events');
    }
    const { eventId } = req.params;
    const parsedEventId = parseInt(eventId, 10); // Mengonversi nilai string menjadi integer

    // Pastikan parsedEventId adalah angka yang valid sebelum melanjutkan
    if (Number.isNaN(parsedEventId)) {
      throw new ResponseError(400, 'Invalid event ID');
    }

    const result = await eventService.deleteEvent(parsedEventId);
    res.status(200).json({
      message: 'Event deleted successfully',
      deletedEvent: result,
    });
  } catch (e) {
    next(e);
  }
};

const searchEvents = async (req, res, next) => {
  try {
    const { region, bloodProvider } = req.query;

    if (!region && !bloodProvider) {
      throw new ResponseError(400, 'At least one of region or bloodProvider is required for search');
    }

    let result;

    if (region) {
      result = await eventService.searchEvents(region);
    } else {
      result = await eventService.searchEvents(bloodProvider);
    }

    res.status(200).json({
      events: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  getAllEvents,
  deleteEvent,
  searchEvents,
};

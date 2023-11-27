import eventService from '../services/event-service.js';

const create = async (req, res, next) => {
  try {
    const { user } = req;
    const request = req.body;
    const result = await eventService.create(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
};

import Joi from 'joi';

const createEventValidation = Joi.object({
  bloodProvider: Joi.string().max(100).required(),
  region: Joi.string().max(100).required(),
  date: Joi.date().iso().required(),
  time: Joi.string().max(100).required(),
  location: Joi.string().max(255).required(),
  capacity: Joi.number().integer().min(0).required(),
  registered: Joi.number().integer().min(0).required(),
  username: Joi.string().max(100).required(),
});

export {
  createEventValidation,
};

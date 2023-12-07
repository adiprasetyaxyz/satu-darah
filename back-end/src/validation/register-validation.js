import Joi from 'joi';

const registerValidationSchema = Joi.object({
  bloodType: Joi.string().max(100),
  username: Joi.string().max(100).required(),
  eventId: Joi.number().integer().required(),
});

export {
  registerValidationSchema,
};

import Joi from 'joi';

const bloodStockValidation = Joi.object({
  providerName: Joi.string().max(255).required(),
  region: Joi.string().max(255).required(),
  address: Joi.string().max(500).required(),
  phoneNumber: Joi.string().max(20).required(),
  packedRedCells: Joi.object().optional(),
  trombocyteConcentrate: Joi.object().optional(),
  freshFrozenPlasma: Joi.object().optional(),
  cryoprecipitatedAHF: Joi.object().optional(),
  leucodepleted: Joi.object().optional(),
  username: Joi.string().max(100).required(),
});
const getProviderValidation = Joi.number().positive().required();

export { bloodStockValidation, getProviderValidation };

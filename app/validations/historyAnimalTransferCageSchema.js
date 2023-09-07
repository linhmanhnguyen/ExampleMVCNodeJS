const Joi = require("joi");

const historyAnimalTransferCageSchema = Joi.object({
  transferCage_ID: Joi.number().integer().positive().required(),
  content: Joi.string(),
});

module.exports = { historyAnimalTransferCageSchema };

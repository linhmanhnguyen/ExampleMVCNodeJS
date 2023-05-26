const Joi = require('joi');

const historyAnimalDeathSchema = Joi.object({
    status: Joi.boolean().required(),
    type_Cause: Joi.string().required(),
    reason: Joi.string(),
});

module.exports = { historyAnimalDeathSchema };
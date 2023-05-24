const Joi = require('joi');

const animalSchema = Joi.object({
    gender_Animal: Joi.string().valid('male', 'female').required(),
    weight: Joi.number().positive().required(),
    entry_Date: Joi.date().required(),
    status: Joi.boolean().required(),
});

module.exports = { animalSchema };
const Joi = require('joi');

const animalSchema = Joi.object({
    type: Joi.string().required(),
    gender_Animal: Joi.string().valid('male', 'female').required(),
    weight: Joi.number().positive().required(),
    status: Joi.string().valid('normal', 'sick', 'dead').required(),
});

const updateAnimalSchema = Joi.object({
    type: Joi.string().required(),
    gender_Animal: Joi.string().valid('male', 'female').required(),
    weight: Joi.number().positive().required(),
    entry_Date: Joi.date().required(),
});

module.exports = { animalSchema, updateAnimalSchema };
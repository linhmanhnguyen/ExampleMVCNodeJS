const Joi = require('joi');

const farmSchema = Joi.object({
    farmName: Joi.string().required(),
    animalType_ID: Joi.number().integer().required(),
    animalDensity: Joi.number().required(),
    ward_ID: Joi.number().integer().positive().required(),
    addressDetail: Joi.string().required(),
});

module.exports = {
    farmSchema
}
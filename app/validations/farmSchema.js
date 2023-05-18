const Joi = require('joi');

const farmSchema = Joi.object({
    FarmName: Joi.string().required(),
    Status: Joi.boolean().required(),
    AnimalType_ID: Joi.number().integer().required(),
    AnimalDensity: Joi.number().required(),
    Ward_ID: Joi.number().integer().required(),
    AddressDetail: Joi.string().required(),
});

module.exports = {
    farmSchema
}
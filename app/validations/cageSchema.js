const Joi = require('joi');

const cageSchema = Joi.object({
    cageName: Joi.string().required(),
    location: Joi.string().required(),
});

module.exports = {
    cageSchema
}
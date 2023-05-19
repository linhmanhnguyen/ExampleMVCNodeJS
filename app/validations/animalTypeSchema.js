const Joi = require('joi');

const animalTypeSchema = Joi.object({
    typeName: Joi.string().required(),
});


module.exports = {
    animalTypeSchema
}
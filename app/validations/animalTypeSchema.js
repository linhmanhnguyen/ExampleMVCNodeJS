const Joi = require('joi');

const animalTypeSchema = Joi.object({
    TypeName: Joi.string().required(),
});


module.exports = {
    animalTypeSchema
}
const Joi = require('joi');

const historyAnimalWeightSchema = Joi.object({
    weight: Joi.number().positive().required(),
    typeAction: Joi.string().required(),
    content: Joi.string(),
});

module.exports = {
    historyAnimalWeightSchema
};
const Joi = require('joi');

const insertSHistorySellAnimals = Joi.object({
    sellAnimals: Joi.number().integer().positive().required(),
    totalWeightAnimals: Joi.number().required(),
    unitPrice: Joi.number().required(),
    buyer_id: Joi.number().integer().required(),
});

module.exports = {
    insertSHistorySellAnimals
}
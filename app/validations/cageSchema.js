const Joi = require('joi');

const insertCageSchema = Joi.object({
    livestockStaff_id: Joi.number().integer().required(),
    veterinaryStaff_id: Joi.number().integer().required(),
    dateEntryCage: Joi.date(),
    numberOfAnimalsInCage: Joi.number().integer(),
    totalWeight: Joi.number(),
});

module.exports = {
    insertCageSchema
}
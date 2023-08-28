const Joi = require('joi');
const JoiDate = require('@joi/date');

const ExtendedJoi = Joi.extend(JoiDate); // Mở rộng Joi với joi-date

const insertCageSchema = Joi.object({
    livestockStaff_id: Joi.number().integer().required(),
    veterinaryStaff_id: Joi.number().integer().required(),
    // dateEntryCage: ExtendedJoi.date().format('DD-MM-YYYY'),
    // numberOfAnimalsInCage: Joi.number().integer(),
    // totalWeight: Joi.number(),
});

module.exports = {
    insertCageSchema
}
const Joi = require('joi');

// Định nghĩa schema cho UserDetail
const userDetailSchema = Joi.object({
    FullName: Joi.string().required(),
    DateOfBirth: Joi.date().iso().min('1900-01-01').max(new Date().toISOString()).required(),
    Gender: Joi.string().valid('male', 'female').required(),
    CitizenIdentification_ID: Joi.string().pattern(/^\d{12}$/).required(),
    AddressDetail: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^(03[2-9]|05[2689]|07[0|6-9]|08[1-9]|09[0-9])\d{7}$/).required(),
    Ward_ID: Joi.number().integer().required(),
});

module.exports = {
    userDetailSchema
}
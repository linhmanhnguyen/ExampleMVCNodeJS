const Joi = require('joi');

// Định nghĩa schema cho UserDetail
const userDetailSchema = Joi.object({
    fullName: Joi.string().required(),
    dateOfBirth: Joi.date().iso().min('1900-01-01').max(new Date().toISOString()).required(),
    gender: Joi.string().valid('male', 'female').required(),
    citizenIdentification_ID: Joi.string().pattern(/^\d{12}$/).required(),
    ward_ID: Joi.number().integer().positive().required(),
    addressDetail: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(/^(03[2-9]|05[2689]|07[0|6-9]|08[1-9]|09[0-9])\d{7}$/).required(),
});

module.exports = {
    userDetailSchema
}
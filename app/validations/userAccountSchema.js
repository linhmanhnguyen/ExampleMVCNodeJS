const Joi = require('joi');

// Định nghĩa schema cho UserAccount
const userAccountSchema = Joi.object({
    username: Joi.string().pattern(/^(03|05|07|08|09)[0-9]{8}$/),
    password: Joi.string().required(),
    userDetail_ID: Joi.number().integer().positive().required(),
    status: Joi.boolean().required(),
    role_ID: Joi.number().integer().positive().required(),
});

const registerAccountSchema = Joi.object({
    username: Joi.string().pattern(/^(03|05|07|08|09)[0-9]{8}$/),
    password: Joi.string().required(),
    fullname: Joi.string().required(),
    farmName: Joi.string().required(),
    animalTypeId: Joi.number().integer().positive().required(),
    animalDensity: Joi.number().integer().positive().required(),
    ward_ID: Joi.number().integer().positive().required(),
    addressDetail: Joi.string().required(),
    numberOfCages: Joi.number().integer().positive().required(),
});

const updateUserAccountSchema = Joi.object({
    password: Joi.string().required(),
});

module.exports = {
    userAccountSchema, updateUserAccountSchema, registerAccountSchema
};

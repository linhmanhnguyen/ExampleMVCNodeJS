const Joi = require('joi');

// Định nghĩa schema cho UserAccount
const userAccountSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    userDetail_ID: Joi.number().integer().required(),
    farm_ID: Joi.number().integer().required(),
    status: Joi.boolean().required(),
    role_ID: Joi.number().integer().required(),
});

const updateUserAccountSchema = Joi.object({
    password: Joi.string().required(),
    status: Joi.boolean().required()
});

module.exports = {
    userAccountSchema, updateUserAccountSchema
};

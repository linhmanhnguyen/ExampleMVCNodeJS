const Joi = require('joi');

// Định nghĩa schema cho UserAccount
const userAccountSchema = Joi.object({
    Username: Joi.string().required(),
    Password: Joi.string().required(),
    UserDetail_ID: Joi.number().integer().required(),
    Farm_ID: Joi.number().integer().required(),
    Status: Joi.boolean().required(),
    Role_ID: Joi.number().integer().required(),
});

const updateUserAccountSchema = Joi.object({
    Password: Joi.string().required(),
    Status: Joi.boolean().required()
});

module.exports = {
    userAccountSchema, updateUserAccountSchema
};

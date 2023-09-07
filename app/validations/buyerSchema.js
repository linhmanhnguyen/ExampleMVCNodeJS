const Joi = require("joi");

const insertBuyer = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^(03[2-9]|05[2689]|07[0|6-9]|08[1-9]|09[0-9])\d{7}$/)
    .required(),
  ward_id: Joi.number().positive().required(),
  farm_id: Joi.number().positive().required(),
  addressDetail: Joi.string().required(),
});

module.exports = {
  insertBuyer,
};

const Joi = require("joi");

const insertEntryCage = Joi.object({
  animalQuantity: Joi.number().integer().positive().required(),
  weightOfAnimal: Joi.number().positive().required(),
  unitPrice: Joi.number().positive().required(),
  supplier_id: Joi.number().integer(),
});

module.exports = {
  insertEntryCage,
};

const joi = require('joi');
const pageSchema = joi.number().integer().min(1);
const limitSchema = joi.number().integer().min(1);
const idSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);


module.exports = {
  pageSchema,
  limitSchema,
  idSchema
};

const joi = require('joi');
const { pageSchema, limitSchema, idSchema } = require('./general');
const Joi = require('joi');

const filterSchema = {
  page: pageSchema,
  limit: limitSchema,
};

const titleSchema = joi.string().max(280);
const descriptionSchema = joi.string().max(280);
const urlSchema = joi.string();
const tipsSchema = joi.array().items(joi.string().required());

const createChallengesSchema = {
  owner: idSchema.required(),
  challengeInfo: Joi.object({
    title: titleSchema.required(),
    description: descriptionSchema.required(),
    tips: tipsSchema,
    url: urlSchema.required(),
  }).required(),
};

module.exports = {
  filterSchema,
  createChallengesSchema,
};

const joi = require('joi');
const { pageSchema, limitSchema, idSchema } = require('./general');
const Joi = require('joi');
const titleSchema = joi.string().max(280);
const descriptionSchema = joi.string().max(280);
const urlSchema = joi.string();
const difficultySchema = joi.string().valid('easy', 'medium', 'hard');
const tipsSchema = joi.array().items(joi.string().required());

const filterSchema = {
  page: pageSchema,
  limit: limitSchema,
  difficulty: difficultySchema
};

const createChallengesSchema = {
  owner: idSchema.required(),
  challengeInfo: Joi.object({
    title: titleSchema.required(),
    description: descriptionSchema.required(),
    tips: tipsSchema,
    url: urlSchema.required(),
    difficulty: difficultySchema.required()
  }).required(),
};

const updateChallengesSchema = {
  challengeInfo: Joi.object({
    title: titleSchema,
    description: descriptionSchema,
    tips: tipsSchema,
    url: urlSchema,
    difficulty: difficultySchema,
  }).required(),
}

module.exports = {
  filterSchema,
  createChallengesSchema,
  updateChallengesSchema,
};

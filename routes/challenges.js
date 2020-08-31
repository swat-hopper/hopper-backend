const express = require('express');
const validationHandler = require('../utils/middleware/validationHandler');
const response = require('../utils/network/response');
const {
  filterSchema,
  createChallengesSchema,
} = require('../utils/schemas/challenges');
const ChallengesService = require('../services/challenges');

function challengesApi(app) {
  const router = express.Router();
  app.use('/api/challenges', router);
  const challengesService = new ChallengesService();

  router.get('/', validationHandler(filterSchema, 'query'), async function (
    req,
    res,
    next
  ) {
    try {
      const challeges = {};

      response.success(req, res, 'challeges listed', 200, challeges);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', validationHandler(createChallengesSchema), createdChallege);

  async function createdChallege(req, res, next) {
    {
      const { body: challenge } = req;

      try {
        const challegeId = await challengesService.createChallenge({
          challenge,
        });

        response.success(req, res, 'challege created', 201, challegeId);
      } catch (error) {
        next(error);
      }
    }
  }
}

module.exports = challengesApi;

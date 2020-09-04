const express = require('express');
const validationHandler = require('../utils/middleware/validationHandler');
const response = require('../utils/network/response');
const {
  filterSchema,
  createChallengesSchema,
  updateChallengesSchema,
} = require('../utils/schemas/challenges');
const ChallengesService = require('../services/challenges');
const { idSchema } = require('../utils/schemas/general');

function challengesApi(app) {
  const router = express.Router();
  app.use('/api/challenges', router);
  const challengesService = new ChallengesService();

  router.get('/', validationHandler(filterSchema, 'query'), getChallenges);
  router.post('/', validationHandler(createChallengesSchema), createdChallege);
  router.get(
    '/:challengeId',
    validationHandler({ challengeId: idSchema }, 'params'),
    getChallenge
  );
  router.patch(
    '/:challengeId',
    validationHandler(updateChallengesSchema),
    updateChallenge
  );

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

  async function getChallenges(req, res, next) {
    try {
      const challenges = await challengesService.getChallenges(req.query);

      response.success(req, res, 'challenge listed', 200, challenges);
    } catch (error) {
      next(error);
    }
  }

  async function getChallenge(req, res, next) {
    try {
      const { challengeId } = req.params;
      const challenge = await challengesService.getChallenge(challengeId);
      response.success(req, res, 'challenge retrieved', 200, challenge);
    } catch (err) {
      next(err);
    }
  }

  async function updateChallenge(req, res, next) {
    const { body: challenge } = req;
    const { challengeId } = req.params;

    try {
      const challengeUpdated = await challengesService.editChallenge({
        challengeId,
        challenge,
      });

      response.success(req, res, 'challege updated', 201, challengeUpdated);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = challengesApi;

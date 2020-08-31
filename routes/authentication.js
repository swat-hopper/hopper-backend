const express = require('express');
const passport = require('passport');
require('../utils/auth/strategies/github');

function authenticationApi(app) {
  const router = express.Router();
  app.use('/auth', router);

  router.get('/github', passport.authenticate('github'));

  router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function (req, res) {
      res.json(req.user);
    }
  );
}

module.exports = authenticationApi;

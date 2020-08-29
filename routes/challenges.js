const express = require("express");
const validationHandler = require("../utils/middleware/validationHandler");
const response = require("../utils/network/response");

function challengesApi(app) {
  const router = express.Router();
  app.use("/api/challenges", router);

  router.get("/", validationHandler(), async function (req, res, next) {
    try {
      const challeges = {};

      response.success(req, res, "challeges listed", 200, challeges);
    } catch (error) {
      next(error);
    }
  });
}

module.exports = challengesApi
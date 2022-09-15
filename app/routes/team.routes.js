module.exports = app => {
  const teams = require("../controllers/team.controller.js");

  var router = require("express").Router();

  // Create a new tutorialsteams
  router.post("/", teams.create);

  // Retrieve all teams
  router.get("/", teams.findAll);

  // Retrieve all published teams
  router.get("/published", teams.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", teams.findOne);

  // Update a Tutorial with id
  router.put("/:id", teams.update);

  // Delete a Tutorial with id
  router.delete("/:id", teams.delete);

  // Delete all teams
  router.delete("/", teams.deleteAll);

  app.use('/api/teams', router);
};

module.exports = app => {
    const Movies = require("../controllers/movie.controller.js");
    var router = require("express").Router();

    // Retrieve a single Movie with id
    router.get("/movie/:id", Movies.findOne);
    router.get("/movies", Movies.findAll);
    app.use('/api', router);
  };
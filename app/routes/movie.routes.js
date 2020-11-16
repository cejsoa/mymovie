const Movies = require("../controllers/movie.controller.js");
var router = require("express").Router();

// Retrieve a single Movie with id (GET Method)
router.get("/findOne/:id", Movies.findOne);
router.get("/findAll", Movies.findAll);

//Create new movie
router.post("/create", Movies.create);

//Update an existing movie
router.put("/update/:id", Movies.update);

//Delete an existing movie
router.delete("/delete/:id", Movies.delete);

//Find movies by aprox name
router.get("/searchbyaproxname/:name", Movies.searchByAproxName);

//Calc average movie grade
router.get("/calcavggrade/:id", Movies.calcAvgGrade);

module.exports = router;
const genre = require("../controllers/genre.controller.js");
var router = require("express").Router();

// Retrieve a single Movie with id (GET Method)
router.get("/findOne/:id", genre.findOne);
router.get("/findAll", genre.findAll);

//Create new movie
router.post("/create", genre.create);

//Update an existing movie
router.put("/update/:id", genre.update);

//Delete an existing movie
router.delete("/delete/:id", genre.delete);

module.exports = router;
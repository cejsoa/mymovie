const language = require("../controllers/language.controller.js");
var router = require("express").Router();

// Retrieve a single Movie with id (GET Method)
router.get("/findOne/:id", language.findOne);
router.get("/findAll", language.findAll);

//Create new movie
router.post("/create", language.create);

//Update an existing movie
router.put("/update/:id", language.update);

//Delete an existing movie
router.delete("/delete/:id", language.delete);

module.exports = router;
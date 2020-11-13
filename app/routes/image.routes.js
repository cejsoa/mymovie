const image = require("../controllers/image.controller.js");
var router = require("express").Router();

// Retrieve a single Movie with id (GET Method)
router.get("/findOne/:id", image.findOne);
router.get("/findAll", image.findAll);

//Create new movie
router.post("/create", image.create);

//Update an existing movie
router.put("/update/:id", image.update);

//Delete an existing movie
router.delete("/delete/:id", image.delete);

module.exports = router;
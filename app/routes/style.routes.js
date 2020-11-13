const style = require("../controllers/style.controller.js");
var router = require("express").Router();

// Retrieve a single Movie with id (GET Method)
router.get("/findOne/:id", style.findOne);
router.get("/findAll", style.findAll);

//Create new movie
router.post("/create", style.create);

//Update an existing movie
router.put("/update/:id", style.update);

//Delete an existing movie
router.delete("/delete/:id", style.delete);

module.exports = router;
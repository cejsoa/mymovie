const Comment = require("../controllers/comment.controller.js");
var router = require("express").Router();

// Retrieve a single Movie with id (GET Method)
router.get("/findOne/:id", Comment.findOne);
router.get("/findAll", Comment.findAll);

//Create new movie
router.post("/create", Comment.create);

//Update an existing movie
router.put("/update/:id", Comment.update);

//Delete an existing movie
router.delete("/delete/:id", Comment.delete);

module.exports = router;
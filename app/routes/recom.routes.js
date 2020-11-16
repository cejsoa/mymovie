const Recom = require("../controllers/recom.controller.js");
var router = require("express").Router();

// Retrieve recommendations
router.get("/results/:gen&:fav&:comm&:imdb&:meta&:pop", 
          Recom.findRecom);

module.exports = router;
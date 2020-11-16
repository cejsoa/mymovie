const view = require("../controllers/view.controller.js");
var router = require("express").Router();

router.get("/", view.homepage);
router.get("/search/:name", view.searchOne);
router.get("/movie", view.movie);
router.get("/navbar", view.navbar);
router.get("/recom/:gen&:fav&:comm&:imdb&:meta&:pop", view.searchOne);

module.exports = router;
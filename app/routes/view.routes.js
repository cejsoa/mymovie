const view = require("../controllers/view.controller.js");
var router = require("express").Router();

router.get("/", view.homepage);
router.get("/search", view.search);
router.get("/movie", view.movie);

module.exports = router;
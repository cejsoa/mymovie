module.exports = app => {
    const Recom = require("../controllers/recom.controller.js");
    var router = require("express").Router();

    // Retrieve text
    router.get("/recom/genre=:gen;fav=:a0;comm=:a1;imdb=:a2;meta=:a3;pop=:a4", 
              Recom.findRecom);
    app.use('/api', router);
    
  };
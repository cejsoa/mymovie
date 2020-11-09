const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const db = require("./app/models");
const dbConfig = require("./app/config/db.config.js");

var app = express();
const moviesController = require("./app/routes/movie.routes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/movies/", moviesController);

db.sequelize.authenticate().then(() => {
  console.log('Connection to the database established successfully')

  }).catch(err => {
    console.log('Unable to conect with the database \n Check the database status or your conection credentials')
})

app.get('/', function (req, res) {
   res.send('Hello World cris');
})

const port = process.env.PORT || 3000

var server = app.listen(port, function () {
   var host = server.address().address
   
   console.log("Listening at http://%s:%s", host, port)
})
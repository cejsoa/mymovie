const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const db = require("./app/models");
const dbConfig = require("./app/config/db.config.js");

var app = express();

// Main path client stablished
app.use(express.static(__dirname + '/client'));

//Routes includes
const moviesRoutes = require("./app/routes/movie.routes");
const commentRoutes = require("./app/routes/comment.routes");
const genreRoutes = require("./app/routes/genre.routes");
const imageRoutes = require("./app/routes/image.routes");
const languageRoutes = require("./app/routes/language.routes");
const styleRoutes = require("./app/routes/style.routes");
const recomRoutes = require("./app/routes/recom.routes");
const viewRoutes = require("./app/routes/view.routes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/movies/", moviesRoutes);
app.use("/api/comments/", commentRoutes);
app.use("/api/genres/", genreRoutes);
app.use("/api/images/", imageRoutes);
app.use("/api/languages/", languageRoutes);
app.use("/api/styles/", styleRoutes);
app.use("/api/recom/", recomRoutes);
app.use("/", viewRoutes);

module.exports = app;
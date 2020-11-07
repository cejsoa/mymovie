const dbConfig = require("../config/db.config.js");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movie = require("./mymovie.movie.js")(sequelize, Sequelize);
db.comment = require("./mymovie.comment.js")(sequelize, Sequelize);
db.genre = require("./mymovie.genre.js")(sequelize, Sequelize);
db.images = require("./mymovie.images.js")(sequelize, Sequelize);
db.languages = require("./mymovie.languages.js")(sequelize, Sequelize);
db.style = require("./mymovie.style.js")(sequelize, Sequelize);

module.exports = db;

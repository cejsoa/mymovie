// const db = require('./app.js')
const app = require('./app.js')
const db = require("./app/models");
const dbConfig = require("./app/config/db.config.js");

db.sequelize.authenticate().then(() => {
  console.log('Connection to the database established successfully')

  }).catch(err => {
    console.log('Unable to conect with the database \n Check the database status or your conection credentials')
})

const port = process.env.PORT || 3000

var server = app.listen(port, function () {
   var host = server.address().address
   
   console.log("Listening at http://%s:%s", host, port)
})

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})
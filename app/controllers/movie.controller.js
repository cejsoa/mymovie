const db = require("../models");
const Movies = db.movie;
const Op = db.Sequelize.Op;

exports.findOne = (req, res) => {
  const id = req.params.id;
  Movies.findByPk(id)
  .then(data => {
    if(data){
      res.send(data)
    } else {
      res.status(404).send(
        {
          message: "Resource not found"
        })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).send({
      message: "Error retrieving Movie with id=" + id
      });
  });
};

exports.findAll = (req, res) => {
  Movies.findAll()
  .then(data => {
    if(data){
      res.send(data)
    } else {
      res.status(404).send(
        {
          message: "Resource not found"
        })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).send({
      message: "Error retrieving Movie with id=" + id
      });
  });
};

const db = require("../models");
const Movies = db.movie;
const Op = db.Sequelize.Op;

//Find one movie object by PK
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

//Retrieve and send all movie objects
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


//Create a new movie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Save Movie in the database
  Movies.create(req.body)
    .then(data => { 
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Movie."
      });
    });
};

//Update an existing movie object
exports.update = (req, res) => {
  const id = req.params.id;

  Movies.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Movie was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Movie with id=${id}. Maybe Movie was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Movie with id=" + id
      });
    });
};

//Delete a Movie object

exports.delete = (req, res) => {
  const id = req.params.id;

  Movies.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Movie was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Movie with id=" + id
      });
    });
};

//Find movies by aproximate name

exports.searchByAproxName = (req, res) => {
  var name = req.params.name;
  Movies.findAll({
    where: {
      NameMovie: {
        [Op.like]: name+'%'
      }
    }
  })
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
      message: "Error retrieving Movies with" + name
      });
  });
};
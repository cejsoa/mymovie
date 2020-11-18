const db = require("../models");
const logic = require("../src/movies.logic");
const Movies = db.movie;
const Op = db.Sequelize.Op;

//Find one movie object by PK
exports.findOne = (req, res) => {
  const id = req.params.id;
  logic.calc_popularity(id);
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
      res.send({Id: data.Id});
      logic.calc_popularity(data.Id);
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
        logic.calc_popularity(id);
      } else {
        res.status(400).send({
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
        res.status(400).send({
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
  const name = req.params.name;
  Movies.sequelize.query(`SELECT * FROM Movies WHERE Movies.NameMovie LIKE \'%${name}%\';`)
  .then(([data, metadata]) => {
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

//Calculate grade by average grade of comments
exports.calcAvgGrade = (req, res) => {
  const id = req.params.id;

  Movies.sequelize.query(`SELECT AVG(Grade) as AvgGrade FROM Comments WHERE IdMovie = ${id};`)
  .then(([data, metadata]) => {
    if(data){
      res.send(data[0])
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
      message: "Error retrieving average grade"
      });
  });
}
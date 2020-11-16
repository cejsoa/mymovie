const db = require("../models");
const Genre = db.genre;
const Op = db.Sequelize.Op;

//Find one Genre object by PK
exports.findOne = (req, res) => {
    const id = req.params.id;
    Genre.findByPk(id)
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
        message: "Error retrieving Genre object with id=" + id
        });
    });
};
  
//Retrieve and send all Genre objects
exports.findAll = (req, res) => {
    Genre.findAll()
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
        message: "Error retrieving Genre object with id=" + id
        });
    });
};
  
  
//Create a new Genre
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
  
    // Save Genre in the database
    Genre.create(req.body)
    .then(data => { 
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Genre object."
        });
    });
};
  
//Update an existing Genre object
exports.update = (req, res) => {
    const id = req.params.id;    
    
    Genre.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Genre object was updated successfully."
            });
        } else {
            res.status(400).send({
                message: `Cannot update Genre object with id=${id}. Maybe Genre was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Genre object with id=" + id
        });
    });
};
  
//Delete a Genre object
  
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Genre.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Genre object was deleted successfully!"
            });
        } else {
            res.status(400).send({
                message: `Cannot delete Genre object with id=${id}. Maybe Genre was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Genre object with id=" + id
        });
    });
};
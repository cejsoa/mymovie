const db = require("../models");
const language = db.languages;
const Op = db.Sequelize.Op;

//Find one language object by PK
exports.findOne = (req, res) => {
    const id = req.params.id;
    language.findByPk(id)
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
        message: "Error retrieving language object with id=" + id
        });
    });
};
  
//Retrieve and send all language objects
exports.findAll = (req, res) => {
    language.findAll()
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
        message: "Error retrieving language object with id=" + id
        });
    });
};
  
  
//Create a new language
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
  
    // Save language in the database
    language.create(req.body)
    .then(data => { 
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the language object."
        });
    });
};
  
//Update an existing language object
exports.update = (req, res) => {
    const id = req.params.id;    
    
    language.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "language object was updated successfully."
            });
        } else {
            res.status(400).send({
                message: `Cannot update language object with id=${id}. Maybe language was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating language object with id=" + id
        });
    });
};
  
//Delete a language object
  
exports.delete = (req, res) => {
    const id = req.params.id;
  
    language.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "language object was deleted successfully!"
            });
        } else {
            res.status(400).send({
                message: `Cannot delete language object with id=${id}. Maybe language was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete language object with id=" + id
        });
    });
};
const db = require("../models");
const style = db.style;
const Op = db.Sequelize.Op;

//Find one style object by PK
exports.findOne = (req, res) => {
    const id = req.params.id;
    style.findByPk(id)
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
        message: "Error retrieving style object with id=" + id
        });
    });
};
  
//Retrieve and send all style objects
exports.findAll = (req, res) => {
    style.findAll()
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
        message: "Error retrieving style object with id=" + id
        });
    });
};
  
  
//Create a new style
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
  
    // Save style in the database
    style.create(req.body)
    .then(data => { 
        res.send({Id: data.Id});
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the style object."
        });
    });
};
  
//Update an existing style object
exports.update = (req, res) => {
    const id = req.params.id;    
    
    style.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "style object was updated successfully."
            });
        } else {
            res.status(400).send({
                message: `Cannot update style object with id=${id}. Maybe style was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating style object with id=" + id
        });
    });
};
  
//Delete a style object
  
exports.delete = (req, res) => {
    const id = req.params.id;
  
    style.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "style object was deleted successfully!"
            });
        } else {
            res.status(400).send({
                message: `Cannot delete style object with id=${id}. Maybe style was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete style object with id=" + id
        });
    });
};
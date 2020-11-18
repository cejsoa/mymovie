const db = require("../models");
const image = db.images;
const Op = db.Sequelize.Op;

//Find one image object by PK
exports.findOne = (req, res) => {
    const id = req.params.id;
    image.findByPk(id)
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
        message: "Error retrieving image object with id=" + id
        });
    });
};
  
//Retrieve and send all image objects
exports.findAll = (req, res) => {
    image.findAll()
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
        message: "Error retrieving image object with id=" + id
        });
    });
};
  
  
//Create a new image
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
  
    // Save image in the database
    image.create(req.body)
    .then(data => { 
        res.send({Id: data.Id});
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the image object."
        });
    });
};
  
//Update an existing image object
exports.update = (req, res) => {
    const id = req.params.id;    
    
    image.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "image object was updated successfully."
            });
        } else {
            res.status(400).send({
                message: `Cannot update image object with id=${id}. Maybe image was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating image object with id=" + id
        });
    });
};
  
//Delete a image object
  
exports.delete = (req, res) => {
    const id = req.params.id;
  
    image.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "image object was deleted successfully!"
            });
        } else {
            res.status(400).send({
                message: `Cannot delete image object with id=${id}. Maybe image was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete image object with id=" + id
        });
    });
};
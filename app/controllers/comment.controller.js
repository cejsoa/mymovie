const db = require("../models");
const movie_logic = require("../src/movies.logic");
const Comment = db.comment;
const Op = db.Sequelize.Op;

//Find one Comment object by PK
exports.findOne = (req, res) => {
    const id = req.params.id;
    Comment.findAll({ where: { IdMovie: id } })
        .then(data => {
            if (data) {
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
                message: "Error retrieving Comment with id=" + id
            });
        });
};

//Retrieve and send all Comment objects
exports.findAll = (req, res) => {
    Comment.findAll()
        .then(data => {
            if (data) {
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
                message: "Error retrieving Comment with id=" + id
            });
        });
};


//Create a new Comment
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Save Comment in the database
    Comment.create(req.body)
        .then(data => {
            res.send({Id: data.Id});
            movie_logic.calc_popularity(data.Id);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Comment object."
            });
        });
};

//Update an existing Comment object
exports.update = (req, res) => {
    const id = req.params.id;

    Comment.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment object was updated successfully."
                });
                movie_logic.calc_popularity(id);
            } else {
                res.status(400).send({
                    message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Comment with id=" + id
            });
        });
};

//Delete a Comment object

exports.delete = (req, res) => {
    const id = req.params.id;

    Comment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was deleted successfully!"
                });
            } else {
                res.status(400).send({
                    message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Comment with id=" + id
            });
        });
};
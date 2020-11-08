const db = require("../models");
const Movies = db.movie;
const Genres = db.genre;
const Op = db.Sequelize.Op;

exports.findRecom = (req, res) => {
    const genre = req.params.gen;
    const fav = req.params.a0;
    const comm = req.params.a1;
    const imdb = req.params.a2;
    const meta = req.params.a3;
    const pop = req.params.a4;
    Genres.hasMany(Movies)
    Movies.belongsTo(Genres, {
        foreignKey: 'IdGenre'
    });
    Movies.findAll({
        attributes: ['NameMovie', 'Favorite', 'CommunityGrade', 
                    'IMDBGrade', 'MetaScoreGrade', 'Popularity'],
        include: [{
            model: Genres,
            required: true,
            attributes: [],
            where: {
                Genre_Name: genre
            }
            }]
    })
    .then(data => {
        if(data){
            // res.send(`<h1>Recomendación:</h1><br>
            //     Genre : &nbsp; ${genre} <br>
            //     Favorite : &nbsp; ${fav} <br>
            //     Community grade : &nbsp; ${comm} <br>
            //     IMDB Grade : &nbsp; ${imdb} <br>
            //     MetaScore grade : &nbsp; ${meta} <br>
            //     Popularity : &nbsp; ${pop} <br><br>
            //     data = ${data}`);
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
            message: "Error retrieving all movies"
        });
    });
}
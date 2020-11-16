const db = require("../models");
const Movies = db.movie;
const Genres = db.genre;
const Op = db.Sequelize.Op;

exports.findRecom = (req, res) => {
    const genre = req.params.gen;
    const fav = req.params.fav;
    const comm = req.params.comm;
    const imdb = req.params.imdb;
    const meta = req.params.meta;
    const pop = req.params.pop;
    Genres.hasMany(Movies)
    Movies.belongsTo(Genres, {
        foreignKey: 'IdGenre'
    });
    Movies.findAll({
        attributes: ['Id', 'NameMovie', 'Favorite', 'CommunityGrade', 
                    'IMDBGrade', 'MetaScoreGrade', 'Popularity'],
        include: [{
            model: Genres,
            required: true,
            attributes: [],
            where: {
                Genre_Name: genre
            }
            }],
        raw : true
    })
    .then(data => {
        if(data){
            var array_movies = [];
            array_movies.push(data);
            array_movies = array_movies[0];
            var i = 0;
            var favorite;
            var n = array_movies.length;
            var grade = 0;
            var values;
            var recommended = [];
            
            while (i < n) 
            {
                values = Object.values(array_movies[i]);
                favorite = values[2] ? 100 : 0;
                grade = favorite * (fav / 100.0)
                        + values[3] * (comm / 100.0)
                        + values[4] * (imdb / 100.0)
                        + values[5] * (meta / 100.0)
                        + values[6] * (pop / 100.0);
                values.push(grade);

                if (recommended.length == 0)
                {
                    recommended.push(values);
                }
                else if (values[7] < recommended[recommended.length - 1][7] 
                        && recommended.length < 10)
                {
                    recommended.push(values)
                }
                else
                {
                    var j = 0;
                    var m = recommended.length;
                    while (j < m)
                    {
                        if (values[7] > recommended[j][7])
                        {
                            recommended.splice(j, 0, values);
                            if (recommended.length == 10)
                            {
                                recommended.pop();
                            }
                            break;
                        }
                        j++;
                    }
                }
                i++;
            }
            var grade_category;
            let json_list = []
            for (i = 0; i < recommended.length; i++) 
            {
                if (recommended[i][7] <= 40) 
                {
                    grade_category = "Alto";
                }
                else if (recommended[i][7] >= 80)
                {
                    grade_category = "Medio";
                }
                else 
                {
                    grade_category = "Bajo";
                }
                json_list.push({"Id": recommended[i][0], "NameMovie": recommended[i][1], "MetaScoreGrade": grade_category});
            }
            res.send(json_list);
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
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
                favorite = values[1] ? 100 : 0;
                grade = favorite * (fav / 100.0)
                        + values[2] * (comm / 100.0)
                        + values[3] * (imdb / 100.0)
                        + values[4] * (meta / 100.0)
                        + values[5] * (pop / 100.0);
                values.push(grade);

                if (recommended.length == 0)
                {
                    recommended.push(values);
                }
                else if (values[6] < recommended[recommended.length - 1][6] 
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
                        if (values[6] > recommended[j][6])
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
            
            recomendation = ``;
            var is_favorite;
            for (let i = 0; i < recommended.length; i++) 
            {
                recomendation += (i + 1) + ": " +  recommended[i][0] + " <br>";
                is_favorite = recommended[i][1] ? "Yes" : "No";
                recomendation += "&nbsp&nbsp Favorite: " + is_favorite + " <br>";
                recomendation += "&nbsp&nbsp Community grade: " + recommended[i][2] + " <br>";
                recomendation += "&nbsp&nbsp IMDB grade: " + recommended[i][3] + " <br>";
                recomendation += "&nbsp&nbsp MetaScore grade: " + recommended[i][4] + " <br>";
                recomendation += "&nbsp&nbsp Popularity: " + recommended[i][5] + " <br>";
                recomendation += "&nbsp&nbsp Total grade: " + recommended[i][6] + " <br><br>";
            }

            res.send(`<h1>You requested a recommendation with the following parammeters:</h1><br>
                Genre : &nbsp; ${genre} <br>
                Favorite : &nbsp; ${fav} <br>
                Community grade : &nbsp; ${comm} <br>
                IMDB Grade : &nbsp; ${imdb} <br>
                MetaScore grade : &nbsp; ${meta} <br>
                Popularity : &nbsp; ${pop} <br>
                <br><br>
                <h2>The top ${recommended.length} movies according to the parammeters are:</h2><br>
                ${recomendation}`);
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
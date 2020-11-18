const db = require("../models");
const Comments = db.comment;
const Movies = db.movie;
const Op = db.Sequelize.Op;

//Points

const year_points = 20;
const one_to_five = 5;
const six_to_ten = 10;
const eleven_to_twenty = 15;
const twentyOne_to_infinite = 20;
const is_favorite = 20;


exports.calc_popularity = async (id_movie) => {
    var movie = await Movies.findByPk(id_movie)
                        .catch(err => {
                            console.log(err);
                        });
    var [comments, metadata] = await Comments.sequelize.query(`SELECT Id FROM Comments WHERE IdMovie = ${id_movie};`)
                                    .catch(err => {
                                        console.log(err);
                                    });
    var num_reviews = comments.length;
    var movie_year = movie.Year_M;
    var is_Favorite = movie.Favorite;
    const todaysDate = new Date();
    var currentYear = todaysDate.getFullYear();
    var movie_points = 0;

    if(currentYear == movie_year){
        movie_points += year_points;
    }
    if(is_Favorite){
        movie_points += is_favorite;
    }
    if(num_reviews >= 1 && num_reviews <= 5){
        movie_points += one_to_five;
    }
    if(num_reviews > 5 && num_reviews <=10){
        movie_points += six_to_ten;
    }
    if(num_reviews > 10 && num_reviews <= 20){
        movie_points += eleven_to_twenty;
    }
    if(num_reviews > 20){
        movie_points += twentyOne_to_infinite;
    }

    await Movies.sequelize.query(`UPDATE Movies SET Popularity = ${movie_points} WHERE Id = ${id_movie};`)
    .catch(err => {
        console.log(err);
    });
}


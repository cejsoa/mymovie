const render_movie = (item) => {
    document.getElementById("movie-title").innerText = item.NameMovie;
    document.getElementById("movie-director").innerText = item.NameDirector;
    document.getElementById("movie-year").innerText = item.Year_M;
    document.getElementById("movie-fav").innerText = item.Favorite;
    document.getElementById("movie-imdb").innerText = item.IMDBGrade;
    document.getElementById("movie-metascore").innerText = item.MetaScoreGrade;
    document.getElementById("movie-popular").innerText = item.Popularity;

    fetch("/api/languages/findOne/" + item.IdLanguage)
        .then(response => response.json())
        .then(data => document.getElementById("movie-lang").innerText = data.Language_Name);

    fetch("/api/genres/findOne/" + item.IdGenre)
        .then(response => response.json())
        .then(data => document.getElementById("movie-genre").innerText = data.Genre_Name);

    fetch("/api/movies/calcavggrade/" + item.Id)
        .then(response => response.json())
        .then(data => document.getElementById("movie-community").innerText = data.calcavggrade);

    fetch("/api/styles/findOne/" + item.IdStyle)
        .then(response => response.json())
        .then(data => document.getElementById("movie-style").innerText = data.Style_Name);

}

const render_comments = (item) => {

    let comment = document.createElement("li");
    comment.setAttribute("class", "comment");

    let grade = document.createElement("label");
    grade.innerText = item.Grade;

    let text = document.createElement("p");
    text.setAttribute("class", "comment-text");
    text.innerText = item.Comment;

    comment.appendChild(grade);
    comment.appendChild(text);

    return comment;
}

const fill_comments = (items) => {

    items.map(comment => {
        document.getElementById("comment-section-id").appendChild(render_comments(comment));
    });
}

function get_movie_info() {
    let movie = window.location.href.split("/");
    let movie_id = movie[movie.length - 1];

    fetch("/api/movies/findOne/" + movie_id)
        .then(response => response.json())
        .then(data => render_movie(data));

    fetch("/api/comments/findOne/" + movie_id)
        .then(response => response.json())
        .then(data => fill_comments(data));
}

get_movie_info()
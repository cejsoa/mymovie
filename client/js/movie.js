const render_movie = (item) => {
    let movie_title = document.getElementById("movie-title");
    movie_title.innerText = item.NameMovie;
    movie_title.setAttribute("value", item.Id);
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
        .then(data => document.getElementById("movie-community").innerText = data.AvgGrade);

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

const append_comment = (comment) => {
    document.getElementById("comment-section-id").appendChild(render_comments(comment));
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

function post_comment() {
    let id = window.location.href.split('/');
    id = id[id.length - 1];
    let value = document.getElementById("user-grade").value;
    let comment = document.getElementById("user-comment").value.trim();
    
    if (comment == "") {
        alert("Por favor, ingrese un comentario");
    }
    else {
        let item = {"IdMovie": id, "Grade": value, "Comment": comment};
        fetch("/api/comments/create", {
            method: 'POST',
            body: JSON.stringify(item),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(() => append_comment(item));
    }
}

get_movie_info();
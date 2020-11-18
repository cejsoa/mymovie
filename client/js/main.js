// Search funtion to load the search view
const get_search = () => {
    let name = document.getElementById("search-bar").value;
    if (name.trim() == "") {
        alert("Por favor ingrese un nombre en la barra de búsqueda");
    }
    else {
        window.location.href = "/search/" + name;
    }
}

const render_genres = (items) => {
    let genre_movies = document.getElementById("movie-genre-id");
    let genre_recom = document.getElementById("recom-gen");
    items.forEach(genre => {
        let option = document.createElement("option");
        let option_recom = document.createElement("option");
        option.setAttribute("value", genre.Id);
        option_recom.setAttribute("value", genre.Id);
        option.innerText = genre.Genre_Name;
        option_recom.innerText = genre.Genre_Name;
        genre_movies.appendChild(option);
        genre_recom.appendChild(option_recom);
    });
}

const render_styles = (items) => {
    let styles_movies = document.getElementById("movie-style-id");
    items.forEach(style => {
        let option = document.createElement("option");
        option.setAttribute("value", style.Id);
        option.innerText = style.Style_Name;
        styles_movies.appendChild(option);
    });
}

const render_lang = (items) => {
    let lang_movies = document.getElementById("movie-lang-id");
    items.forEach(lang => {
        let option = document.createElement("option");
        option.setAttribute("value", lang.Id);
        option.innerText = lang.Language_Name;
        lang_movies.appendChild(option);
    });
}

const render = () => {
    fetch("/api/genres/findAll")
        .then(resp => resp.json())
        .then(data => render_genres(data));
    fetch("/api/styles/findAll")
        .then(resp => resp.json())
        .then(data => render_styles(data));
    fetch("/api/languages/findAll")
        .then(resp => resp.json())
        .then(data => render_lang(data));
}

const main_page = () => window.location.href = "/";

// Recom function to load the recommendations view
function get_recom() {
    let gen = document.getElementById("recom-gen").value.trim();
    let fav = document.getElementById("recom-fav").value.trim();
    let comm = document.getElementById("recom-comm").value.trim();
    let imdb = document.getElementById("recom-imdb").value.trim();
    let meta = document.getElementById("recom-meta").value.trim();
    let pop = document.getElementById("recom-pop").value.trim();

    if (gen == "") {
        alert("Por favor, ingrese un género");
    }
    else if (fav == "" || isNaN(fav)) {
        alert("Por favor, ingrese un peso válido para el atributo 'Favorito'");
    }
    else if (comm == "" || isNaN(comm)) {
        alert("Por favor, ingrese un peso válido para el atributo 'Nota comunidad'");
    }
    else if (imdb == "" || isNaN(imdb)) {
        alert("Por favor, ingrese un peso válido para el atributo 'Nota IMDB'");
    }
    else if (meta == "" || isNaN(meta)) {
        alert("Por favor, ingrese un peso válido para el atributo 'Nota MetaScore'");
    }
    else if (pop == "" || isNaN(pop)) {
        alert("Por favor, ingrese un peso válido para el atributo 'Popularidad'");
    }
    else {
        let sum = parseInt(fav) + parseInt(comm) + parseInt(imdb) + parseInt(meta) + parseInt(pop);
        if (sum > 100) {
            alert("La suma de las cinco categorías no puede ser mayor que 100 (valor ingresado -> " + sum + ")");
        }
        else if (parseInt(fav) < 0 || parseInt(fav) > 35) {
            alert("El atributo 'Favorito' tiene que ser un número entre 0 y 35");
        }
        else if (parseInt(comm) < 0 || parseInt(comm) > 35) {
            alert("El atributo 'Nota comunidad' tiene que ser un número entre 0 y 35");
        }
        else if (parseInt(imdb) < 0 || parseInt(imdb) > 35) {
            alert("El atributo 'Nota IMDB' tiene que ser un número entre 0 y 35");
        }
        else if (parseInt(meta) < 0 || parseInt(meta) > 35) {
            alert("El atributo 'Nota MetaScore' tiene que ser un número entre 0 y 35");
        }
        else if (parseInt(pop) < 0 || parseInt(pop) > 35) {
            alert("El atributo 'Popularidad' tiene que ser un número entre 0 y 35");
        }
        else {
            window.location.href = "/recom/"
                + gen + "&"
                + fav + "&"
                + comm + "&"
                + imdb + "&"
                + meta + "&"
                + pop;
        }
    }
}


function readImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


async function add_movie() {
    let movie_name = document.getElementById("movie-name-id").value;
    let movie_director = document.getElementById("movie-director-id").value;
    let movie_genre = document.getElementById("movie-genre-id").value;
    let movie_lang = document.getElementById("movie-lang-id").value;
    let movie_style = document.getElementById("movie-style-id").value;
    let movie_fav = document.getElementById("movie-fav-id").value;
    let movie_year = document.getElementById("movie-year-id").value;
    let movie_imdb = document.getElementById("movie-imdb-id").value;
    let movie_metascore = document.getElementById("movie-metascore-id").value;
    let movie_image = document.getElementById("movie-image-id");

    let movie = {
        "NameMovie": movie_name,
        "NameDirector": movie_director,
        "Year_M": movie_year,
        "IdGenre": movie_genre,
        "IdLanguage": movie_lang,
        "Favorite": movie_fav,
        "IMDBGrade": movie_imdb,
        "IdStyle": movie_style,
        "MetaScoreGrade": movie_metascore,
        "Popularity": 0,
        "CommunityGrade": 0,
        "IdImage": 0
    };

    let image = {};

    console.log(movie_image.files[0]);

    await readImage(movie_image.files[0])
        .then(data => image["Image_Link"] = data);
    console.log(image);

    // await fetch("/api/images/create",
    //     {
    //         method: 'POST',
    //         body: JSON.stringify(image),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    // ).then(response => response.json())
    //     .then(data => movie["IdImage"] = data.Id);

    console.log(movie);

    await fetch("/api/movies/create",
        {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => response.json())
        .then(data => console.log(data));
    console.log("finalizado el agregar");
}

const initialize_listeners = () => {
    document.getElementById("btn-search-bar").onclick = get_search;
    document.getElementById("btn-accept-recom").onclick = get_recom;
    document.getElementById("logo-button").onclick = main_page;
    document.getElementById("btn-accept-movie").onclick = add_movie;
    document.getElementById("btn-add-comment").onclick = post_comment;
}

// This function makes a request to get the global nav bar 
function getNavBar() {
    fetch("/navbar")
        .then(response => response.text())
        .then(data => document.getElementById("global-nav-bar").innerHTML = data)
        .then(() => initialize_listeners());
    render();
}

getNavBar();

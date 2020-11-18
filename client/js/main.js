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
        option.setAttribute("value", genre.Genre_Name);
        option_recom.setAttribute("value", genre.Genre_Name);
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
        option.setAttribute("value", style.Style_Name);
        option.innerText = style.Style_Name;
        styles_movies.appendChild(option);
    });
}

const render_lang = (items) => {
    let lang_movies = document.getElementById("movie-lang-id");
    items.forEach(lang => {
        let option = document.createElement("option");
        option.setAttribute("value", lang.Language_Name);
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

const initialize_listeners = () => {
    document.getElementById("btn-search-bar").onclick = get_search;
    document.getElementById("btn-accept-recom").onclick = get_recom;
    document.getElementById("logo-button").onclick = main_page;
    document.getElementById("btn-accept-movie").onclick = add_movie;
}

const main_page = () => window.location.href = "/";

// Recom function to load the recommendations view
function get_recom() {
    let gen = document.getElementById("recom-gen").value;
    let fav = document.getElementById("recom-fav").value;
    let comm = document.getElementById("recom-comm").value;
    let imdb = document.getElementById("recom-imdb").value;
    let meta = document.getElementById("recom-meta").value;
    let pop = document.getElementById("recom-pop").value;

    if (gen.trim() == "") {
        alert("Por favor, ingrese un género");
    }
    else if (fav.trim() == "") {
        alert("Por favor, ingrese un peso para el atributo 'Favorito'");
    }
    else if (comm.trim() == "") {
        alert("Por favor, ingrese un peso para el atributo 'Nota comunidad'");
    }
    else if (imdb.trim() == "") {
        alert("Por favor, ingrese un peso para el atributo 'Nota IMDB'");
    }
    else if (meta.trim() == "") {
        alert("Por favor, ingrese un peso para el atributo 'Nota MetaScore'");
    }
    else if (pop.trim() == "") {
        alert("Por favor, ingrese un peso para el atributo 'Popularidad'");
    }
    else {

        let sum = parseInt(fav) + parseInt(comm) + parseInt(imdb) + parseInt(meta) + parseInt(pop);
        if (sum > 100) {
            alert("La suma de las cinco categorías no puede ser mayor que 100 (valor ingresado -> " + sum + ")");
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

// 
function add_movie() {
    
}

// This function makes a request to get the global nav bar 
function getNavBar() {
    fetch("/navbar")
        .then(response => response.text())
        .then(data => document.getElementById("global-nav-bar").innerHTML = data)
        .then(() => initialize_listeners());
}

render();
getNavBar()

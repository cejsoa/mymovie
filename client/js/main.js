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
            window.location.href = "/recom/" + gen 
                                    + "&" + fav
                                    + "&" + comm
                                    + "&" + imdb
                                    + "&" + meta
                                    + "&" + pop;
        }
    }
}

const initialize_listeners = () => {
    document.getElementById("btn-search-bar").onclick = get_search;
    document.getElementById("btn-accept-recom").onclick = get_recom;
    document.getElementById("logo-button").onclick = main_page;
    document.getElementById("btn-add-comment").onclick = post_comment;
}

// This function makes a request to get the global nav bar 
function getNavBar() {
    fetch("/navbar")
        .then(response => response.text())
        .then(data => document.getElementById("global-nav-bar").innerHTML = data)
        .then(() => initialize_listeners());
}

getNavBar()
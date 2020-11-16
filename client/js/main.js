// Search funtion to load the search view
function get_search() {
    let name = document.getElementById("search-bar").value;
    if (name.trim() == "") {
        alert("Por favor ingrese un nombre en la barra de búsqueda");
    }
    else {
        window.location.href = "/search/" + name;
    }
}

// Recom function to load the recommendations view
function get_recom(){
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
            window.location.href = "/recom/" + gen 
                                    + "&" + fav
                                    + "&" + comm
                                    + "&" + imdb
                                    + "&" + meta
                                    + "&" + pop;
        }
    }
}

// This function makes a request to get the global nav bar 
function getNavBar() {
    fetch("/navbar")
        .then(response => response.text())
        .then(data => document.getElementById("global-nav-bar").innerHTML = data)
        .then(() => document.getElementById("btn-search-bar").onclick = get_search)
        .then(() => document.getElementById("btn-accept-recom").onclick = get_recom);
}

getNavBar()
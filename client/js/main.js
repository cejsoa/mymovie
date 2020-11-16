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

// This function makes a request to get the global nav bar 
function getNavBar() {
    fetch("/navbar")
        .then(response => response.text())
        .then(data => document.getElementById("global-nav-bar").innerHTML = data)
        .then(() => document.getElementById("btn-search-bar").onclick = get_search);
}

getNavBar()
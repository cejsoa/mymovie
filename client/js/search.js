// Child node creation to append in html search list
const renderItem = (item) => {
    // Lista node
    let list_child = document.createElement("li");
    list_child.setAttribute("class", "row-list");
    list_child.setAttribute("value", item.Id);

    // List child node
    let left_column = document.createElement("label");
    left_column.setAttribute("class", "column left");
    left_column.innerText = item.NameMovie;

    // Lista child node
    let right_column = document.createElement("label");
    right_column.setAttribute("class", "column right");
    right_column.innerText = item.MetaScoreGrade;

    // Child nodes added
    list_child.appendChild(left_column);
    list_child.appendChild(right_column);

    return list_child;
};

// Cicly to append rows in the search list
function fill_html(data) {
    for (let i = 0; i < data.length; i++) {
        document.getElementById("search-list").append(renderItem(data[i]));
    }
}

// Main function to get movie
function fill_list() {
    let pageURL = window.location.href.split('/');
    let item = pageURL[pageURL.length - 1];

    if (window.location.href.toString().search("/recom/") != -1) {
        fetch("/api/recom/results/" + item)
            .then(response => response.json())
            .then(data => fill_html(data));
    }
    else {
        fetch("/api/movies/searchbyaproxname/" + item)
            .then(response => response.json())
            .then(data => fill_html(data));
    }
}

fill_list();
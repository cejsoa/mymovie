const render_card = async (item) => {
    let card = document.createElement("li");
    card.setAttribute("class", "home-item icon");
    card.value = item.Id;
    let img = document.createElement("img");
    await fetch("/api/images/findOne/" + item.IdImage)
        .then(response => response.json())
        .then(data => img.setAttribute("src", data.Image_Link));
    let label = document.createElement("label");
    label.innerText = item.NameMovie;

    card.appendChild(img);
    card.appendChild(label);

    return card;
}

function load_movie () {
    window.location.href = "/movie/" + this.value;
}

async function fill_cards(movies) {
    let container = document.getElementById("container-home");
    let length = movies.length / 3;
    console.log(length);
    for (let i = 0; i < length; i++) {
        console.log("Entrando")
        let div = document.createElement("div");
        div.setAttribute("class", "home-movies");
        for (let j = i * 3; j < (i * 3 + 3) && j < movies.length; j++) {
            let item = await render_card(movies[j]);
            item.addEventListener("click", load_movie);
            div.append(item);
        }
        container.appendChild(div);
    }

    console.log(movies);
}

function fill_movies() {
    fetch("/api/movies/findAll")
        .then(response => response.json())
        .then(data => fill_cards(data));
}

fill_movies();
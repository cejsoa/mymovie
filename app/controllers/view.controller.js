const path = require("path");
const fs = require("fs");
const { dirname } = require("path");

exports.homepage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "client", "home_page.html"));
};

exports.search = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "client", "search.html"));
};

exports.searchOne = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "client", "search.html"));
};

exports.movie = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "client", "movie.html"));
};

exports.navbar = (req, res) => {
    let bar = path.join(__dirname, "..", "..", "client", "navbar.html");
    let navbar_data = fs.readFileSync(bar);

    res.send(navbar_data.toString());
};
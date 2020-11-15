const path = require("path")

exports.homepage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "client", "home_page.html"));
};

exports.search = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "client", "search.html"));
};

exports.movie = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "client", "movie.html"));
};
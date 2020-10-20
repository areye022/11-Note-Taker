const path = require("path");

module.exports = function(app) {
    // Call Root HTML Page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    // Call Note Taking HTML Page
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
}
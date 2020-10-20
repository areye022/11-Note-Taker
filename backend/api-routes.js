const fs = require("fs");

// Read data from DB.JSON file where notes are being stored
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

// Export a function that can GET, POST and DELETE
module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(data);
    });

    app.post("/api/notes", function(req, res) {
        // Set newNote to the (note) object provided by index.js and give it a uniqueID
        let newNote = req.body;
        let uniqueId = (data.length).toString();
        newNote.id = uniqueId;
        data.push(newNote);
        // Write to DB.JSON file with updated data
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        }); 
        res.json(data);    
    });

    // index.js uses /api/notes/ + id, make sure to use variable /:id and check notes against the ID provided
    app.delete("/api/notes/:id", function(req, res) {
        let noteId = req.params.id;
        let newId = 0;
        // Remove based on ID with .filter
        data = data.filter(currentNote => { return currentNote.id != noteId });
        // Reassign ID number after .filter function
        for (currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        }
        // Rewrite DB.JSON file with updated data
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    }); 
}
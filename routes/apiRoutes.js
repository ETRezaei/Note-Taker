var path = require("path");
var db = require("../database/db.json");
var fs = require("fs");



module.exports = function(app) {
    i = 1
    app.post("/api/notes", function(req, res){
        var newNote = req.body;
        let data = JSON.parse(db);
        data["id"] = i;
        data.push(newNote);
        
        fs.appendFile(path.join(__dirname, '../database/db.json'), newDB, 'utf8', function(err) {
            if (err) throw err;
            console.log('json updated!');
        })

        i++;

        // res.json(data);
      });
    

      app.post("/api/delete/:id",function(req,res){

        let deletingItem = req.params;
        for (let i = 0; i < db.length; i++) { 
            if (db[i].id === deletingItem.id) {
              db.splice(i, 1); 
            };
        };
        let newDb = JSON.stringify(db);
        fs.writeFile(path.join(__dirname, '../database/db.json'), newDb, 'utf8', function(err) {
            if (err) throw err;
            console.log('deleted!');
        });

        res.json(noteToDelete.title);
    })

};
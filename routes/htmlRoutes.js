var path = require("path");

module.exports = function(app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------

    //app.use(express.static(path.join(__dirname, 'public')));

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/assets/style.css", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/style.css"));
    });
  
    
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
}
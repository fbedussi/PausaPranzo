var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    express = require("express"),
    bodyParser = require("body-parser");

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

var server = new express();

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));


server.get("/", function(req, res) {
    res.send("welcome to /");
});


//rotte di base per il menu
server.get("/menu", function(req, res) {
    var test = { "ciao": "miao" };
    res.send(test);
});
server.get("/menu/:date", function(req, res) {
    res.send("menu di "+req.params.date);
});
server.get("/menu/:date/:dish", function(req, res) {
    res.send("menu di "+req.params.date+" portata: "+req.params.dish);
});


// Start the server
server.listen(8080, function () {
    console.log("Express server listening on port 8080");
});

function handle(req, res) {
    var root = "./public";
    console.log(req.path);
    var uri = req.path;
    var filename = path.join(root, uri);
    var stats;

    function fileNotFound(err) {
        console.log("FILE NOT FOUND");
        //reply("404 Not Found\n").type("text/plain").code(404);

        res.sendStatus(404);
        return;
    }

    function manageRequest(filePath){
        console.log("ManageRequest");
        console.log("fs.lstat->"+filePath);
        fs.lstat(filePath, function(err, stats){
            console.log("fs.lstat");
            console.log(err);
            console.log(stats);
            if (err) {
                console.log("fs.lstat-err->"+filePath);
                return fileNotFound();
            }
            return  manageFileResponse(stats,filePath);
        });
    }

    function manageFileResponse(stats,filePath) {
        console.log("manageFileResponse");
        var stats = stats;

        if (stats.isDirectory()) {

            console.log("isDir");
            var fileNewName = path.join(filename, "index.html");

            //Se è una directory provo a fornire index.html come file di default da cercare e riparto
            manageRequest(fileNewName);

        } else if (stats.isFile()) {

            console.log("isFile");
            console.log(filePath);
            //controllo il mimeType che ho mappato precedentemente
            console.log(path.extname(filePath));
            console.log(path.extname(filePath).split("."));
            console.log(path.extname(filePath).split(".").reverse());
            console.log(path.extname(filePath).split(".").reverse()[0]);

            var mimeType = mimeTypes[path.extname(filePath).split(".").reverse()[0]];
            //res.json({ "file": "filename" });
            var options = {
                root: __dirname + '/',
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                }
            };
            res.sendFile(filePath, options, function (err) {
                if (err) {
                  console.log(err);
                  res.status(err.status).end();
                }
                else {
                  console.log('Sent:', filePath);
                }
              });

        } else {

            console.log("isBatman");
            //reply("500 Internal server error").type("text/plain").status(500);
            res.sendStatus(500);

        }
    }

    //Inizia qui
    try {
        manageRequest(filename);

    } catch (err) {
        fileNotFound()
    }





}
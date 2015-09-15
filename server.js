var path = require("path"),
    fs = require("fs"),
    express = require("express"),
    bodyParser = require("body-parser"),
    moment = require("moment");

var config = {
    "dataDir": "/data",
    "dateFormat": "YYYY_MM_DD"
};

var server = new express();

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));


server.get("/", function(req, res) {
    res.send("welcome to /");
});


//rotte di base per il menu
server.get("/menu", function(req, res) {

   var filename = "\\" + moment().format(config.dateFormat) + ".json";

   serveFile(config.dataDir, filename, res);

});

server.get("/menu/:date", function(req, res) {

    var date = req.params.date;
    validateDate(date);

    var filename = "\\" + date + ".json";

    serveFile(config.dataDir, filename, res);

});

server.get("/menu/:date/:helping", function(req, res) {

    var date = req.params.date;
    validateDate(date);

    var filename = "\\" + date + ".json";
    var filePath = path.join(__dirname, "data",  filename);
    console.log("fs.lstat->"+filePath);

    fs.readFile(filePath, "utf8", function(err, data) {
      if (err)
            res.send(err);

        var menu = JSON.parse(data);
        var helping = menu[req.params.helping];
console.log(helping);
        if(typeof helping !== "undefined") {
            console.log("ok");
            res.send(helping); return true;
        }
        else {
            res.status(404).send({ error: 'Not found' });
        }

    });

});


// Start the server
server.listen(8080, function () {
    console.log("Express server listening on port 8080");
});

function validateDate(date) {
    return /\d{4}_\d{2}_\d{2}/.test(date) && moment(date, config.dateFormat);
}

function serveFile(directory, filename, res) {
    var options = {
        root: path.join(__dirname, directory),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendFile(filename, options, function (err) {
        if (err) {
          console.log(err);
          res.status(err.status).end();
        }
        else {
          console.log('Sent:', filename);
        }
    });
}

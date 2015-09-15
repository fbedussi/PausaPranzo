var path = require("path"),
    fs = require("fs"),
    express = require("express"),
    bodyParser = require("body-parser"),
    moment = require("moment");

// Services

var menuService = require('./services/menu.js');

// populate
menuService.populate();

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

  menuService.getToday(function (err, docs) {

      if (err) {
        res.send('error');
      } else {
        res.send(docs);
      }

  });

});

server.get("/menu/:date", function(req, res) {

    var date = req.params.date;

    menuService.getMenu(date, function (err, docs) {

        if (err) {
          res.send('error');
        } else {
          res.send(docs);
        }

    });

});

server.get("/menu/:date/:helping", function(req, res) {

    var date = req.params.date;
    validateDate(date);

    var menu = menuService.getMenu(date, req.params.helping, function (err, docs) {

        if (err) {
          res.send('error');
        } else {
          res.send(docs);
        }

    });


});

server.post("/menu/:date", function(req, res) {

    var date = req.params.date,
        name = req.body.name,
        type = req.body.type,
        price = req.body.price;

    menuService.addToMenu(date, { name: name, type: type, price: price }, function (err, docs) {

        if (err) {
          res.send('error');
        } else {
          res.send(docs);
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

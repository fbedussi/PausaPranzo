var db = require('./db'),
    moment = require("moment");

var menu = {

  getMenu: function () {

    var cb,
        q = { date: arguments[0] };

    if (arguments.length > 2 && typeof arguments[1] === 'string') {
      q.type = arguments[1];
    }

    cb = arguments[arguments.length - 1];

    return db.find(q, cb);

  },

  getToday: function (cb) {

    var today = moment().format('YYYY_MM_DD');

    return menu.getMenu(today, null, cb);

  },

  addToMenu: function (date_string, data, cb) {

    db.insert(
      { name: data.name, price: data.price, type: data.type, date: date_string },
      cb
    );

  },

  populate: function () {

    var date = moment(),
        date_string = date.format('YYYY_MM_DD');

    db.insert(
      { name: 'Pasta alla norma', price: 7.00, type: 'primi', date: date_string }
    );

    db.insert(
      { name: 'pasta al pesto', price: 5.00, type: 'primi', date: date_string }
    );

    db.insert(
      { name: 'fettina ai ferri', price: 8.00, type: 'secondi', date: date_string }
    );

    db.insert(
      { name: 'Insalatona', price: 7.00, type: 'secondi', date: date_string }
    );

    // Yesterday
    date_string = date.subtract(1, 'day').format('YYYY_MM_DD');

    db.insert(
      { name: 'Pasta con le sarde', price: 7.00, type: 'primi', date: date_string }
    );

    db.insert(
      { name: 'Pollo al curry', price: 7.00, type: 'secondi', date: date_string }
    );

    db.insert(
      { name: 'Pesce spada con le patate', price: 12.00, type: 'secondi', date: date_string }
    );

  }

};

module.exports = menu;

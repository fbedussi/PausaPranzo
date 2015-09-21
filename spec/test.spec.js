var request = require("request");
var base_url = "http://localhost:8080/";
var moment = require('moment');
var _ = require('lodash');

describe("Homepage", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});

describe("Menu API", function() {
  describe("GET /menu", function() {
    it("returns status code 200", function(done) {
      request.get(base_url + 'menu', function(error, response, body) {

        var today = moment().format('YYYY_MM_DD');

        expect(response.statusCode).toBe(200);

        var data = JSON.parse(body);

        expect(typeof data).toBe('object');

        expect(data.length).toBeGreaterThan(0);

        _.each(data, function (dish) {

          expect(dish.date).toBe(today);

        });

        done();
      });
    });
  });

  describe("GET /menu/:date", function() {
    it("returns status code 200", function(done) {

      var d = moment(),
          today = d.format('YYYY_MM_DD'),
          yesterday = d.subtract(1, 'day').format('YYYY_MM_DD');

      request.get(base_url + 'menu/' + yesterday, function(error, response, body) {

        expect(response.statusCode).toBe(200);

        var data = JSON.parse(body);

        expect(typeof data).toBe('object');

        expect(data.length).toBeGreaterThan(0);

        _.each(data, function (dish) {

          expect(dish.date).toBe(yesterday);
          expect(dish.date).not.toBe(today);

        });

        done();
      });
    });
  });

});

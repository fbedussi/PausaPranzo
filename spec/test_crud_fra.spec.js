var request = require("request");

var base_url = "http://localhost:8080/api/v1/json/dishes/";

describe("CRUD operations on dishes collection", function() {
  var id;
  
  it("can create a dish", function() {
    request.post(base_url, {
      form:{
        name:'Spaghetti al pomodoro', //Bisogna definire gli attributi dei piatti
        category: 'Primi',
        vegetarian: true
      }
    }, function(err,httpResponse,body){
        id = body.dish.id;
        expect(httpResponse.statusCode).toBe(200);
        expect(id).toMatch(/[0-9]+/);
        expect(body.dish.name).toBe("Spaghetti al pomodoro");
        expect(body.dish.category).toBe("Primi");
        expect(body.dish.vegetarian).toBe(true);
      });
  });
  
  it("can read a dish", function() {
    request.get(base_url + 'ID=' + id, function(err,httpResponse,body){
        expect(httpResponse.statusCode).toBe(200);
        expect(body.dish.name).toBe("Spaghetti al pomodoro");
        expect(body.dish.category).toBe("Primi");
        expect(body.dish.vegetarian).toBe(true);
      });
  });
  
  it("can update a dish", function() {
    request.put(base_url, {json: {id: id, name: "Spaghetti al ragù", vegetarian: false}}, function(err,httpResponse,body){
        expect(httpResponse.statusCode).toBe(200);
        expect(body.dish.name).toBe("Spaghetti al ragù");
        expect(body.dish.category).toBe("Primi");
        expect(body.dish.vegetarian).toBe(false);
      });
  });
  
  it("can delete a dish", function() {
    request.del(base_url, {json: {id: id, name: "Spaghetti al ragù", vegetarian: 0}}, function(errDel,httpResponseDel,bodyDel){
        request.get(base_url + 'ID=' + id, function(errGet,httpResponseGet,bodyGet){
          expect(httpResponseDel.statusCode).toBe(200);
          expect(errGet).toBe(true);
        });
      });
  });
  
});

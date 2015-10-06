module.exports = function(grunt, options) {
  'use strict';

  var task = {
    dev: ["nodemon:dev", "watch:backend"],
    options: {
      logConcurrentOutput: true
    }
  };


  return task;
};

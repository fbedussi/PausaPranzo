module.exports = function(grunt, options) {
  'use strict';

  var task = {
    nodemon: {
      dev: {
        script: './server.js'
      }
    }
  };


  return task;
};

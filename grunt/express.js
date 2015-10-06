module.exports = function(grunt, options) {
  'use strict';


  var task = {
    options: {
      // Override defaults here
    },
    dev: {
      options: {
        script: './server.js'
      }
    },
    prod: {
      options: {
        script: './server.js',
        node_env: 'production'
      }
    },
    test: {
      options: {
        script: './server.js'
      }
    }
  };


  return task;
};

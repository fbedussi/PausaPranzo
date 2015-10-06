module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;

  var task = {
    options: {
      force: true
    },
    frontend: {
      options: {
        jshintrc: './conf/frontend.jshintrc'
      },
      src: [
        frontend.build.js
      ]
    },
    backend: {
      options: {
        jshintrc: './.jshintrc'
      },
      src: [
        'Gruntfile.js',
        './.server.js',
        'spec/**'
      ]
    }
  };


  return task;
};

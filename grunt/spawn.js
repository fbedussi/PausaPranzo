module.exports = function(grunt, options) {
  'use strict';

  var path = require('path');

  var task = {
    webstart: {
      command: 'node',
      commandArgs: ['server.js','{0}'],
      directory: './',
      groupFiles: true,
      passThrough: false,
      pattern: 'www',
      opts: {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      }
    }
  };


  return task;
};

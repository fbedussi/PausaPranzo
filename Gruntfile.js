/*
 * PausaPranzo
 * https://github.com/NerdCommunity/PausaPranzo
 *
 * Copyright (c) 2014 NerdCommunity
 * Licensed under the MIT license.
 */
 module.exports = function(grunt) {

  grunt.initConfig({
  	concurrent: {
        dev: ["nodemon", "watch"],
        options: {
            logConcurrentOutput: true
        }
    },
    jshint: {
      files: ['Gruntfile.js', './*.js'],
      options: {
        jshintrc: '.jshintrc',
      }
    },
    watch: {
      options: {
        livereload: true,
        nospawn: true
      },
      scripts: {
        files: ['./*.js'],
        tasks: ['jshint']
      }
    },
	// jasmine: {
	// 	src: 'spec/test.js'
	// },
	spawn: {
	  webstart: {
	    command: 'node',
	    commandArgs: ['server.js','{0}'],
	    directory: './',
	    groupFiles: true, 
	    passThrough: false,
	    pattern: 'www',
	    opts: {
	      stdio: 'inherit',
	      cwd: __dirname + '/'
	    }
	  }
	},
	nodemon: {
        dev: {
            script: 'server.js',
            options: {
                /** Environment variables required by the NODE application **/
                env: {
                      "NODE_ENV": "development",
                      "NODE_CONFIG": "dev"
                },
                watch: ["server"],
                delay: 300,

                callback: function (nodemon) {
                    nodemon.on('log', function (event) {
                        console.log(event.colour);
                    });

                    /** Open the application in a new browser window and is optional **/
                    nodemon.on('config:update', function () {
                        // Delay before server listens on port
                        setTimeout(function() {
                            require('open')('http://localhost:8080');
                        }, 1000);
                    });

                    /** Update .rebooted to fire Live-Reload **/
                    nodemon.on('restart', function () {
                        // Delay before server listens on port
                        setTimeout(function() {
                            require('fs').writeFileSync('.rebooted', 'rebooted');
                        }, 1000);
                    });
                }
            }
        }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-spawn');
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-concurrent");

  grunt.registerTask("spawn", ["spawn:webstart"]);
  grunt.registerTask("nodemon", ["nodemon:dev"]);
  
  grunt.registerTask("default", ["concurrent:dev"]);

};

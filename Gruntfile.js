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
        dev: ["nodemon:dev", "watch"],
        options: {
            logConcurrentOutput: true
        }
    },
    jshint: {
      files: ['Gruntfile.js', './server/**/*.js', 'spec/*.js'],
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
        files: ['./server/**/*.js'],
        tasks: ['jshint', 'express:dev']
      }
    },
	// jasmine: {
	// 	src: 'spec/test.js'
	// },
	spawn: {
	  webstart: {
	    command: 'node',
	    commandArgs: ['./server/server.js','{0}'],
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
            script: './server/server.js',

        }
    },

    jasmine_nodejs: {
      options: {
        useHelpers: false,
        stopOnFailure: false,
        // configure one or more built-in reporters
              reporters: {
                  console: {
                      colors: true,
                      cleanStack: 1,       // (0|false)|(1|true)|2|3
                      verbosity: 4,        // (0|false)|1|2|3|(4|true)
                      listStyle: "indent", // "flat"|"indent"
                      activity: false
                  },
                  // junit: {
                  //     savePath: "./reports",
                  //     filePrefix: "junit-report",
                  //     consolidate: true,
                  //     useDotNotation: true
                  // },
                  // nunit: {
                  //     savePath: "./reports",
                  //     filename: "nunit-report.xml",
                  //     reportName: "Test Results"
                  // },
                  // terminal: {
                  //     color: false,
                  //     showStack: false,
                  //     verbosity: 2
                  // },
                  // teamcity: true,
                  // tap: true
              }
      },
      dev: {
            // spec files
            specs: [
                "spec/**"
            ]
        }
    },

    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: './server/server.js'
        }
      },
      prod: {
        options: {
          script: './server/server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: './server/server.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jasmine-nodejs');
  grunt.loadNpmTasks('grunt-spawn');
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask("spawn", ["spawn:webstart"]);
  grunt.registerTask("nodemon", ["nodemon:dev"]);
  grunt.registerTask("test", ['jshint', "express:dev", "jasmine_nodejs:dev"]);

  grunt.registerTask("default", ["concurrent:dev"]);

  grunt.registerTask("serve", ["express:dev", "watch"]);

};

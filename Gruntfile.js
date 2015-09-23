/*
 * PausaPranzo
 * https://github.com/NerdCommunity/PausaPranzo
 *
 * Copyright (c) 2014 NerdCommunity
 * Licensed under the MIT license.
 */
 module.exports = function(grunt) {

  grunt.initConfig({
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
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask("test", ['jshint', "express:dev", "jasmine_nodejs:dev"]);
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("serve", ["express:dev", "watch"]);

};

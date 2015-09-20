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
      files: ['Gruntfile.js', './*.js'],
      options: {
        jshintrc: '.jshintrc',
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['**/*.html']
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
	}
/*,
    connect: {
      livereload: {
        options: {
          port: 8080,
          middleware: function(connect, options) {
            return[
              require('connect-livereload')(),
              
              connect.directory(options.base)
            ];
          }
        }
      }
    }*/
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-spawn');

  grunt.registerTask("test", ["spawn:webstart"]);

  grunt.registerTask('default', ['jshint', 'spawn']);

};

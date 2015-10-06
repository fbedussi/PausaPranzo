/**
 * PausaPranzo
 * https://github.com/NerdCommunity/PausaPranzo
 *
 * Copyright (c) 2014 NerdCommunity
 * Licensed under the ISC license.
 */
 module.exports = function(grunt) {
   'use strict';

   // TASKS
   grunt.task.registerTask('deploy', [
     'frontend'
   ]);

   grunt.task.registerTask('deployProd', [
     'shell:deployProduction'
   ]);

   grunt.registerTask("spawn", [
     "spawn:webstart"
   ]);

   grunt.registerTask("default", [
     "concurrent:dev"
   ]);

   grunt.registerTask("serve", [
     "express:dev",
     "watch:backend"
   ]);

   grunt.registerTask("nodemon", [
     "nodemon:dev"
   ]);

   grunt.registerTask("test", [
     "jshint:backend",
     "express:dev",
     "jasmine_nodejs:dev"
   ]);

   grunt.registerTask("default", [
     "concurrent:dev"
   ]);

   grunt.registerTask("serve", [
     "express:dev",
     "watch:backend"
   ]);




   /* *** INITIALIZE CONFIGURATION *** */
   var ENV_PRODUCTION = /^production$/i.test(grunt.option('ENV'));
   var pkg = grunt.file.readJSON('./package.json');
   var frontendConfigs = 'default';

   if(ENV_PRODUCTION) {
     frontendConfigs = 'production';
     grunt.log.ok('Grunt Running in PRODUCTION environment');
   }

   frontendConfigs = require('./conf/' + frontendConfigs + '.frontend.js');

   require('load-grunt-config')(grunt, {
     init: true,
     jitGrunt: {
       staticMappings: {
         "ngtemplates" : "grunt-angular-templates"
       }
     },
     data: {
       "pkg" : pkg,
       "frontend" : frontendConfigs,
       "ngFiles" : require('./grunt/helpers/NgFolderingPattern.js')(frontendConfigs),
       "uniq": frontendConfigs.cacheBuster.uniq
     }
   });


   // Private Tasks
   grunt.task.registerTask('angularWatch', [
     'newer:uglify:development',
     'newer:ngAnnotate:modules',
     'newer:jshint:frontend'
   ]);

   grunt.task.registerTask('sassWatch', [
     'newer:sass:development',
     'newer:postcss:development'
   ]);

   grunt.task.registerTask('angular', [
     'jscs',
     'uglify:development',
     'ngAnnotate',
     'jshint',
     'ngtemplates',
     'uglify:production',
     'angularI18n'
   ]);

   grunt.task.registerTask('angularI18n', [
     'shell:i18nXslxToJson'
   ]);

   grunt.task.registerTask('frontend', [
     'clean:frontendPublicDir',
     'angular',
     'sass',
     'postcss:deploy',
     'concat',
     'frontendIncludes'
   ]);
};

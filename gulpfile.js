var jshint = require('gulp-jshint'),
    gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    spawn = require('child_process').spawn,
    node,
    jasmine = require('gulp-jasmine');

// Based on: https://gist.github.com/webdesserts/5632955

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['server.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

/**
 * $ gulp livereload
 * description: notify livereload to plugins
 */

gulp.task('livereload', function() {
    livereload.reload();
});

/**
 * $ gulp jshint
 * description: Chekc bad javascript code
 */

gulp.task('jshint', function() {
  return gulp.src('./*.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
});

/**
 * $ gulp watch
 * description: watch changes and reload server
 */

gulp.task('watch', function() {
    livereload.listen({ basePath: './' });
    gulp.watch(['*.js'], ['jshint']);
    gulp.watch(['server.js'], ['jshint', 'server', 'livereload']);
});

/**
 * $ gulp test
 * description: tO DO
 */

gulp.task('test', ['server'], function() {

  setTimeout(function () {

    gulp.src('spec/test.js')
      .pipe(jasmine());

  }, 2000);

});


/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', ['jshint', 'server', 'watch'])   ;

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) {
      node.kill();
    }
})

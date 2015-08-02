var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    node;

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
 * $ gulp watch
 * description: watch changes and reload server
 */

gulp.task('watch', function() {
  var server = ['server'];
  gulp.watch(['server.js'], server);
});

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', ['server', 'watch']);

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) {
      node.kill();
    }
})

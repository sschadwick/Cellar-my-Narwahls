'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

var filesToWatch = ['server.js', 'routes/*.js', 'models/*.js', 'lib/*.js', 'test/**/*.js', 'gulpfile.js', 'app/**/*.js'];
var appFiles = ['app/**/*.html', 'app/**/*.js']; //dont want to jshint html files

gulp.task('jshint', function() {
  return gulp.src(filesToWatch)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  return gulp.watch(filesToWatch, ['default']);
});

gulp.task('test', function() {
  return gulp.src('./test/**/*tests.js')
    .pipe(mocha({reporter: 'nyan'}))
    .once('error', function(err) {
      console.log(err);
      process.exit(1);
    })
    .once('end', function() {
      if (this.seq.length === 1 && this.seq[0] === 'test')
        process.exit();
    }.bind(this));
});

gulp.task('watch', function() {
  return gulp.watch(filesToWatch, ['default']);
});

gulp.task('default', ['test']);

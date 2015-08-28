
var gulp = require('gulp');
var path = require("path")
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var glob = require("glob")
var del = require("del")
var gutil = require("gutil")
var replaceExt = require('replace-ext')
var dest = './javascript/'


gulp.task('clean', function() {
  del(dest)
})
var libs = [
  "react", "redux"
]
// https://github.com/greypants/gulp-starter/issues/75
gulp.task('browserify-lib', function() {
  var b = browserify({
    require: libs
  }).bundle()
    .pipe(source("lib.js"))
    .pipe(gulp.dest(path.join(dest, "lib")))
})

gulp.task('browserify-client', function() {
  var base = "./src/entry/"
  var entries = "**/*"
  glob.sync(entries, {cwd: base}).forEach(function(file){
    var b = browserify({
      entries: path.join(base, file),
      extensions: ['jsx', 'js'],
      transform: [babelify],
    })
    libs.forEach(function(lib){
      b.external(lib)
    })
    var fileName = replaceExt(file, ".js")
    b.bundle()
      .pipe(source(fileName))
      .pipe(gulp.dest(path.join(dest, "client")))
  })
});

gulp.task('watch', function() {
  gulp.watch('src/**/*', ['browserify'])
});

gulp.task('browserify', [ 'browserify-lib', 'browserify-client']);
gulp.task('default', ['browserify', 'watch']);
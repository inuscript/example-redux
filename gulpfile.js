var gulp = require('gulp');
var path = require("path")
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var glob = require("glob")
var del = require("del")
var gutil = require("gutil")
var factor = require('factor-bundle');
var replaceExt = require('replace-ext')

var dest = './javascript/'

gulp.task('clean', function() {
  del(dest)
})

var libs = [
  "react", "redux"
]

var externalLibs = function(b){
  libs.forEach(function(lib){
    b.external(lib)
  })
  return b
}
// https://github.com/greypants/gulp-starter/issues/75
gulp.task('browserify-lib', function() {
  var b = browserify({
    require: libs
  }).bundle()
    .pipe(source("lib.js"))
    .pipe(gulp.dest(path.join(dest, "lib")))
})

gulp.task('browserify-entry', function() {
  var base = "./src/entry/"
  var entries = "**/*"
  var files = glob.sync(entries)
  // console.log(files)
  // files.forEach(function(file){
  var b = browserify({
    entries: files,
    extensions: ['js', 'jsx'],
  })
  // .plugin(factor, {
  //   outputs: glob.sync(entries)
  // })
  b = externalLibs(b)
  b.transform(babelify)
  // var fileName = replaceExt(file, ".js")
  b.bundle()
    .pipe(source("common.js"))
    .pipe(gulp.dest(path.join(dest, "client")))
  // })
});

gulp.task('watch', function() {
  gulp.watch('src/**/*', ['browserify'])
});

gulp.task('browserify', [
  'browserify-lib',
  // 'browserify-app',
  'browserify-entry'
]);
gulp.task('default', ['browserify', 'watch']);
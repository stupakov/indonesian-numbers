"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // runs local dev server
var open = require('gulp-open'); // opens url in a web browser
var browserify = require('browserify'); // bundles js
var reactify = require('reactify'); // transforms jsx to js
var source = require('vinyl-source-stream'); // use conventional text streams with gulp
var concat = require('gulp-concat'); // for concatting files
var lint = require('gulp-eslint');


var config = {
  port: 9006,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    css: [
	    "node_modules/bootstrap/dist/css/bootstrap.min.css",
	    "node_modules/bootstrap/dist/css/bootstrap-theme.min.css"
    ],
    mainJs: './src/main.js',
    dist: './dist'
  }
};

const babelConfig = {presets: ["es2015", "react"]};

//Start a local dev server
gulp.task('connect', function() {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

gulp.task('open', ['connect'], function() {
  gulp.src('dist/index.html')
    .pipe(open({
      uri: config.devBaseUrl + ':' + config.port + '/'
    }))
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload())
})

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.transform("babelify", babelConfig)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload())
})

gulp.task('css', function() {
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
})

gulp.task('lint', function() {
  return gulp.src(config.paths.js)
    .pipe(lint({configFile: 'eslint.config.json'}))
    .pipe(lint.format());
})

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('build', ['html', 'js', 'css']);
gulp.task('default', ['build', 'lint', 'open', 'watch']);

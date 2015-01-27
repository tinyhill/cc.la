var gulp = require('gulp');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');

var src = './bower_components/';
var build = './public/';
var stylesheets = build + 'stylesheets/';
var javascripts = build + 'javascripts/';
var images = build + 'images/';
var fonts = build + 'fonts/';

gulp.task('bootstrap:css', function () {
    gulp.src(src + 'bootstrap/dist/css/bootstrap.css')
        .pipe(replace(/\/(.*)\/\n$/g, ''))
        .pipe(gulp.dest(stylesheets));
});

gulp.task('bootstrap:js', function () {
    gulp.src(src + 'bootstrap/dist/js/bootstrap.js')
        .pipe(gulp.dest(javascripts));
});

gulp.task('bootstrap:fonts', function () {
    gulp.src(src + 'bootstrap/dist/fonts/*.*')
        .pipe(gulp.dest(fonts));
});

gulp.task('bootstrap', [
    'bootstrap:css',
    'bootstrap:js',
    'bootstrap:fonts'
]);

gulp.task('jquery', function () {
    gulp.src(src + 'jquery/dist/jquery.js')
        .pipe(gulp.dest(javascripts));
});

gulp.task('respond', function () {
    gulp.src(src + 'respond/src/respond.js')
        .pipe(gulp.dest(javascripts));
});

gulp.task('default', [
    'bootstrap',
    'jquery',
    'respond'
]);
var gulp = require('gulp');
var replace = require('gulp-replace');

var src = './bower_components/';
var build = './public/';
var stylesheets = build + 'stylesheets/';
var javascripts = build + 'javascripts/';
var images = build + 'images/';
var fonts = build + 'fonts/';

gulp.task('bootstrap:css', function () {
    gulp.src(src + 'bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest(stylesheets));
});

gulp.task('bootstrap:js', function () {
    gulp.src(src + 'bootstrap/dist/js/bootstrap.min.js')
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

gulp.task('html5shiv', function () {
    gulp.src(src + 'html5shiv/dist/html5shiv.min.js')
        .pipe(gulp.dest(javascripts));
});

gulp.task('jquery', function () {
    gulp.src(src + 'jquery/dist/jquery.min.js')
        .pipe(replace(/\/\/#(.*)\.map$/g, ''))
        .pipe(gulp.dest(javascripts));
});

gulp.task('respond', function () {
    gulp.src(src + 'respond/dest/respond.min.js')
        .pipe(gulp.dest(javascripts));
});

gulp.task('default', [
    'bootstrap',
    'html5shiv',
    'jquery',
    'respond'
]);
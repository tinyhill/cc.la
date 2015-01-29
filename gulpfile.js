var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');

var assets = './assets/';
var bower = './bower_components/';
var dest = './public/';

gulp.task('global:css', function () {
    gulp.src([
        assets + 'stylesheets/global.less',
        assets + 'stylesheets/index.less'
    ])
        .pipe(less())
        .pipe(concat('global.css'))
        .pipe(minify({
            compatibility: 'ie7'
        }))
        .pipe(gulp.dest(dest + 'stylesheets'));
});

gulp.task('global:fonts', function () {
    gulp.src(bower + 'bootstrap/dist/fonts/*.*')
        .pipe(gulp.dest(dest + 'fonts'));
});

gulp.task('global:js', function () {
    gulp.src([
        bower + 'jquery/dist/jquery.js',
        bower + 'bootstrap/dist/js/bootstrap.js',
        assets + 'javascripts/global.js'
    ])
        .pipe(concat('global.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dest + 'javascripts'));
});

gulp.task('global:respond', function () {
    gulp.src(bower + 'respond/src/respond.js')
        .pipe(uglify())
        .pipe(gulp.dest(dest + 'javascripts'));
});

gulp.task('default', [
    'global:css',
    'global:fonts',
    'global:js',
    'global:respond'
]);

gulp.watch(assets + 'stylesheets/*.less', [
    'global:css'
]);

gulp.watch(assets + 'javascripts/*.js', [
    'global:js'
]);
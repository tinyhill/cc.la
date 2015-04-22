var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');

var assets = './assets/';
var bower = './bower_components/';
var build = './public/';

gulp.task('css', function () {

    gulp.src([
        assets + 'less/global.less'
    ])
        .pipe(less())
        .pipe(concat('global.css'))
        .pipe(minify())
        .pipe(gulp.dest(build + 'css'));

});

gulp.task('fonts', function () {

    gulp.src(bower + 'bootstrap/dist/fonts/*.*')
        .pipe(gulp.dest(build + 'fonts'));

});

gulp.task('js', function () {

    gulp.src([
        bower + 'jquery/dist/jquery.js',
        bower + 'bootstrap/dist/js/bootstrap.js',
        assets + 'js/global.js'
    ])
        .pipe(concat('global.js'))
        .pipe(uglify())
        .pipe(gulp.dest(build + 'js'));

});

gulp.task('respond', function () {

    gulp.src(bower + 'respond/src/respond.js')
        .pipe(uglify())
        .pipe(gulp.dest(build + 'js'));

});

gulp.task('default', [
    'css',
    'fonts',
    'js',
    'respond'
]);

gulp.task('watch', function () {

    gulp.watch([
        assets + 'less/*.less',
        assets + 'less/*/*.less'
    ], ['css']);

    gulp.watch([assets + 'js/*.js'], ['js']);

});
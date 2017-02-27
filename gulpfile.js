var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var groc = require("gulp-groc");
var clean = require('gulp-clean');

gulp.task('default', [
    'less',
    'js',
    'html'
], function () {
});

gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(concat('map.min.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', function () {
    return gulp.src([
        'src/js/extend/googleMaps.js',
        'src/js/model/marker.js',
        'src/js/model/track.js',
        'src/js/model/kml.js',
        'src/js/service/chart.service.js',
        'src/js/service/map.service.js',
        'src/js/service/storage.service.js',
        'src/js/init.js'
    ])
        .pipe(uglify({
            mangle: true
        }))
        .pipe(concat('map.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('html', function () {
    return gulp.src('./src/angularjs.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('docs:clean', function () {
    return gulp
        .src([
            'docs/src'
        ], {
            read: false
        })
        .pipe(clean());
});

gulp.task('docs', [
    'docs:clean'
], function () {
    return gulp
        .src("./src/js/**/*.js")
        .pipe(groc({
            out: 'docs'
        }));
});
/*
Install NPMs with following command:
sudo npm install --save-dev gulp gulp-jshint gulp-sass gulp-imagemin browserify gulp-uglify gulp-htmlmin gulp-concat gulp-rename vinyl-source-stream vinyl-buffer gulp-autoprefixer gulp-sourcemaps gulp-sync gulp-clean-css
*/

var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var kraken = require('gulp-kraken');

// JavaScript linting task
gulp.task('jshint', function () {
    return gulp.src('site/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Sass task
gulp.task('sass', function () {
    return gulp.src('site/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('site/css'));
});

// Watch task
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['jshint']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Image compression task
gulp.task('kraken', function () {
    gulp.src('images/**/*.*')
        .pipe(kraken({
            key: 'c044274e9c61e42f163398818979a918',
            secret: 'ed09693ca7c7c5c3a943f9adabc16a01b2835f53',
            lossy: true
        }));
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch', 'kraken']);

// Minify index.html
gulp.task('html', function () {
    return gulp.src('site/index.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('build/'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function () {
    return browserify('./js/main.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest('./js'));
});

// Styles build task, concatenates all the files
gulp.task('styles', function () {
    return gulp.src('css/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('build/css'));
});

// Image optimization task
gulp.task('images', function () {
    return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'));
});

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images']);

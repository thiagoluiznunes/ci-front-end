'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');

gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts']);

gulp.task('deps.js', () => {
  return gulp.src([
    'node_modules/angular/angular.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-aria/angular-aria.min.js',
    'node_modules/angular-messages/angular-messages.min.js',
    'node_modules/angular-material/angular-material.min.js',
    'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
    'node_modules/angular-toastr/dist/angular-toastr.tpls.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js'])
  .pipe(uglify())
  .pipe(concat('deps.min.js'))
  .pipe(gulp.dest('public/assets/js'));
});

gulp.task('deps.css', () => {
  return gulp.src([
    'node_modules/angular-toastr/dist/angular-toastr.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css'])
  .pipe(uglifycss({'uglyComments': true}))
  .pipe(concat('deps.min.css'))
  .pipe(gulp.dest('public/assets/css'));
});

gulp.task('deps.fonts', () => {
  return gulp.src([
    'node_modules/font-awesome/fonts/*.*',
    'node_modules/bootstrap/dist/fonts/*.*',
    'node_modules/%40fortawesome'])
  .pipe(gulp.dest('public/assets/fonts'));
});

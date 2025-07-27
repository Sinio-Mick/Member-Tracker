var gulp = require('gulp');
var sass = require('gulp-sass');

var input = './src/sass/**/*.scss';
var output = './src/css';

gulp.task('default', function () {
  return gulp
    // Find all `.scss` files from the `stylesheets/` folder
    .src(input)
    // Run Sass on those files
    .pipe(sass())
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(output));
});
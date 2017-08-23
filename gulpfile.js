var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    minify = require('gulp-minify');

gulp.task('default', ['scripts'], function() {
  gulp.watch('src/*.js', function() {
    gulp.run('scripts');
  });
});

gulp.task('scripts', function() {
  gulp.src(['src/*.js']).pipe(minify()).pipe(gulp.dest('dist/'));
});

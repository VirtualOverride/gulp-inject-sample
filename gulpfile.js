'use strict';

var gulp = require('gulp'),
	inject = require('gulp-inject'),
    browserSync = require('browser-sync'),
    superstatic = require( 'superstatic' );

var paths = {
	javascript: ['./src/**/*.js']
};

gulp.task('index', function(){
    return gulp.src('./src/index.html')
        .pipe(inject(
            gulp.src(paths.javascript,
                {read: false}), {relative: true}))
        .pipe(gulp.dest('./src'));
});

gulp.task('watch', function() {
    gulp.watch([paths.javascript], ['index']);
});

gulp.task('serve', ['index', 'watch'], function() {
  process.stdout.write('Starting browserSync and superstatic...\n');
  browserSync({
    port: 3178,
    files: ['index.html', '**/*.js'],
    injectChanges: true,
    logFileChanges: false,
    logLevel: 'silent',
    logPrefix: 'angularin20typescript',
    notify: true,
    reloadDelay: 0,
    server: {
      baseDir: './src',
      middleware: superstatic({ debug: false})
    }
  });
});

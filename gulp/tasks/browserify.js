// var browserify = require('browserify');
// var gulp = require('gulp');
// var source = require('vinyl-source-stream');
//
// gulp.task('browserify', function() {
//     return browserify('src/main.js')
//         .bundle()
//         //Pass desired output filename to vinyl-source-stream
//         .pipe(source('bundle.js'))
//         // Start piping stream to tasks!
//         .pipe(gulp.dest('/build/'));
// });
// // gulp.task('build', ['browserify', 'compass', 'images']);
// // gulp.task('default', ['browserify']);
//

'use strict';

var gulp       = require('gulp'),
    source     = require('vinyl-source-stream'),
    rename     = require('gulp-rename'),
    browserify = require('browserify'),
    glob       = require('glob'),
    es         = require('event-stream');

gulp.task('default', function(done) {
    glob('../src/main.js', function(err, files) {
        if(err) done(err);

        var tasks = files.map(function(entry) {
            return browserify({ entries: [entry] })
                .bundle()
                .pipe(source(entry))
                .pipe(rename({
                    extname: '.bundle.js'
                }))
                .pipe(gulp.dest('./dist'));
            });
        es.merge(tasks).on('end', done);
    })
});

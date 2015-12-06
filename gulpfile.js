var gulp = require('gulp');
source     = require('vinyl-source-stream'),
rename     = require('gulp-rename'),
browserify = require('browserify'),
glob       = require('glob'),
es         = require('event-stream');


// gulp.task('default', function(done) {
//     glob('/src/main.js', function(err, files) {
//         if(err) done(err);
//         console.log('***************************************files',files);
//         var tasks = files.map(function(entry) {
//           console.log('***************************************entry');
//             return browserify({ entries: [entry] })
//                 .bundle()
//                 .pipe(source(entry))
//                 .pipe(rename({
//                     extname: '.bundle.js'
//                 }))
//                 .pipe(gulp.dest('/dist'));
//                 console.log('WTF?!??!??!?!??!?!??!?!?!??!?!?******************************');
//             });
//         es.merge(tasks).on('end', done);
//     })
// });

gulp.task('default', function(done) {
    
        // if(err) done(err);
        // console.log('***************************************files',files);
        // var tasks = files.map(function(entry) {
          console.log('***************************************entry');
            return browserify({ 'entries': '/Users/veeweeherman/Desktop/JERBZ-coding-challenges/cinematicData/src/main.js' })
                .bundle()
                .pipe(source(entry))
                .pipe(rename({
                    extname: '.bundle.js'
                }))
                .pipe(gulp.dest('dist'));
                console.log('WTF?!??!??!?!??!?!??!?!?!??!?!?******************************');
            // });
        es.merge(tasks).on('end', done);

});






// // var gulp = require('/gulp/tasks/browserify.js');
// // ([
// //     'browserify'
// //
// // ]);
// // var browserify = require('browserify');
// // var gulp = require('gulp');
// // var source = require('vinyl-source-stream');
// //
// // gulp.task('browserify', function() {
// //     return browserify('src/main.js')
// //         .bundle()
// //         //Pass desired output filename to vinyl-source-stream
// //         .pipe(source('bundle.js'))
// //         // Start piping stream to tasks!
// //         .pipe(gulp.dest('/build/'));
// // });
//
//
//
// var gulp       = require('gulp'),
//     source     = require('vinyl-source-stream'),
//     rename     = require('gulp-rename'),
//     browserify = require('browserify'),
//     glob       = require('glob'),
//     es         = require('event-stream');
//
// var bundle = browserify('src/main.js').bundle();
// gulp.task('default', function(done) {
//     glob('../src/main.js', function(err, files) {
//         if(err) done(err);
//
//         var tasks = files.map(function(entry) {
//             return browserify({ entries: [entry] })
//                 .bundle()
//                 .pipe(source(entry))
//                 .pipe(rename({
//                     extname: '.bundle.js'
//                 }))
//                 .pipe(gulp.dest('./dist'));
//             });
//         es.merge(tasks).on('end', done);
//     })
// });
//
// gulp.task('build', ['browserify']);
// gulp.task('default', ['browserify']);

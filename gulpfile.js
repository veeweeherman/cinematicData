var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var path = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: ['./src/js/main.js','./src/js/data.js']
};

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.MINIFIED_OUT))
      .pipe(gulp.dest(path.DEST_BUILD))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify({file:path.MINIFIED_OUT})))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build']);
gulp.task('default', ['watch']);





// var gulp = require('gulp');
// source     = require('vinyl-source-stream'),
// rename     = require('gulp-rename'),
// browserify = require('browserify'),
// glob       = require('glob'),
// es         = require('event-stream');
//
// gulp.task('browserify', function(done) {
//
//         if(err) done(err);
//         console.log('***************************************files',files);
//         var tasks = files.map(function(entry) {
//         // var entry = '/Users/veeweeherman/Desktop/JERBZ-coding-challenges/cinematicData/src/main.js';
//           console.log('***************************************entry');
//             return browserify({ 'entries': path.ENTRY_POINT})
//                 .bundle()
//                 .pipe(source(path.ENTRY_POINT))
//                 .pipe(rename({
//                     extname: '.bundle.js'
//                 }))
//                 .pipe(gulp.dest('dist'));
//                 console.log('WTF?!??!??!?!??!?!??!?!?!??!?!?******************************');
//             // });
//         es.merge(tasks).on('end', done);
//
// });


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

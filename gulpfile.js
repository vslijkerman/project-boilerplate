var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    postcss  = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    flexibility = require('postcss-flexibility');

var devUrl = ''; // Put your local development URl here. eg. http://localhost or http://localhost:8888

var PATHS = {
  sass: ['assets/src/scss/**/*.scss', '!_*.scss'],
  js: ['assets/src/js/*.js'],
  html: ['*.html']
}

/********************
* Copying files from
* bower_components to
* project folder
********************/
gulp.task('copyscss', function() {
  gulp.src([
    'bower_components/meyerreset/_reset.scss',
    'bower_components/normalize/sass/_normalize.scss',
    'bower_components/normalize/sass/_support-for.scss'
  ])
  .pipe(gulp.dest('assets/src/scss/base'));
});

gulp.task('copynormalize', function() {
  gulp.src([
    'bower_components/normalize/sass/normalize/**/*.scss'
  ])
  .pipe(gulp.dest('assets/src/scss/base/normalize'));
});

gulp.task('copyvideojs', function() {
  gulp.src([
    'bower_components/videojs/dist/video-js.css'
  ])
  .pipe(rename('_video-js.scss'))
  .pipe(gulp.dest('assets/src/scss/base'));
});

gulp.task('copyfa', function() {
  gulp.src([
    'bower_components/fontawesome/scss/font-awesome.scss'
  ])
  .pipe(rename({ prefix: '_' }))
  .pipe(gulp.dest('assets/src/scss/icons/fontawesome'));
});

gulp.task('copyfapartials', function() {
  gulp.src([
    'bower_components/fontawesome/scss/_animated.scss',
    'bower_components/fontawesome/scss/_bordered-pulled.scss',
    'bower_components/fontawesome/scss/_core.scss',
    'bower_components/fontawesome/scss/_fixed-width.scss',
    'bower_components/fontawesome/scss/_icons.scss',
    'bower_components/fontawesome/scss/_larger.scss',
    'bower_components/fontawesome/scss/_list.scss',
    'bower_components/fontawesome/scss/_mixins.scss',
    'bower_components/fontawesome/scss/_path.scss',
    'bower_components/fontawesome/scss/_rotated-flipped.scss',
    'bower_components/fontawesome/scss/_screen-reader.scss',
    'bower_components/fontawesome/scss/_stacked.scss',
    'bower_components/fontawesome/scss/_variables.scss'
  ])
  .pipe(gulp.dest('assets/src/scss/icons/fontawesome'));
});

gulp.task('copyjquery', function() {
  gulp.src([
    'bower_components/jquery/index.js'
  ])
  .pipe(rename('jquery.3.0.0.js'))
  .pipe(gulp.dest('assets/src/js/vendors'));
});

gulp.task('copyjs', function() {
  gulp.src([
    'bower_components/html5shiv/dist/html5shiv.min.js',
    'bower_components/flexibility/dist/flexibility.js',
    'bower_components/picturefill/dist/picturefill.js',
    // 'bower_components/svg4everybody/dist/svg4everybody.js',
    'bower_components/raf/rAF.js',
    'bower_components/videojs/dist/video.min.js',
    'bower_components/videojs/dist/ie8/videojs-ie8.min.js'
  ])
  .pipe(gulp.dest('assets/src/js/vendors'));
});

gulp.task('copyfonts', function() {
  gulp.src([
    'bower_components/fontawesome/fonts/**/*.{otf,ttf,woff,woff2,eot,svg}',
    'bower_components/videojs/dist/font/**/*.{otf,ttf,woff,woff2,eot,svg}'
  ])
  .pipe(gulp.dest('assets/src/fonts'));
});

gulp.task('init', ['copyscss', 'copynormalize', 'copyvideojs', 'copyfa', 'copyfapartials', 'copyjquery', 'copyjs','copyfonts']);

/********************
* Compile scss
********************/
gulp.task('scss', function() {
  var postProcessors = [
    autoprefixer({browsers: ['last 2 versions']}),
    flexibility()
  ];
  gulp.src(['assets/src/scss/**/*.scss'])
  .pipe(plumber({
    errorHandler: function (error) {
      console.log(error.message);
      this.emit('end');
    }
  }))
  .pipe(sass())
  .pipe(postcss(postProcessors))
  .pipe(gulp.dest('assets/dist/css/'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(minifycss())
  .pipe(gulp.dest('assets/dist/css'))
  .pipe(browserSync.stream());
});

/********************
* Concatenate scripts
********************/
gulp.task('js', function() {
  return gulp.src([
    'assets/src/js/vendors/jquery.3.0.0.js',
    'assets/src/js/vendors/flexibility.js',
    'assets/src/js/vendors/picturefill.js',
    // 'assets/src/js/vendors/svg4everybody.js',
    'assets/src/js/vendors/rAF.js',
    'assets/src/js/site.js'
  ])
  .pipe(plumber({
    errorHandler: function (error) {
      console.log(error.message);
      this.emit('end');
    }
  }))
  .pipe(concat('site.js'))
  .pipe(gulp.dest('assets/dist/js'))
  .pipe(browserSync.stream());
});

/********************
* Have BrowserSync refresh
* HTML files on change
********************/
gulp.task('html', function() {
  return gulp.src(PATHS.html)
  .pipe(browserSync.stream());
});

/********************
* BrowserSync
********************/
gulp.task('browserSync', function() {
  browserSync.init({
    proxy: devUrl
  });
});

/********************
* Watcher
********************/
gulp.task('watch', ['browserSync', 'scss', 'js'], function() {
  gulp.watch(PATHS.sass, ['scss']);
  gulp.watch(PATHS.html, ['html']);
  gulp.watch(PATHS.js, ['js']);
});


/********************
* Default task
********************/
gulp.task('default', ['scss', 'browserSync', 'watch']);

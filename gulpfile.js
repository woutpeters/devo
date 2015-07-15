var gulp = require('gulp');
var sass = require('gulp-sass');
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');
var pages = require('gulp-gh-pages');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var livereload = require('gulp-livereload');
var autoprefix = require('gulp-autoprefixer');

// Images
gulp.task('images', function(){
  gulp.src('src/images/**')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/'));
});

// Styles
gulp.task('styles', function() {
   return gulp.src( 'src/sass/main.scss')
   		.pipe(autoprefix('last 10 version'))
        .pipe(sass({outputStyle: 'compact'}))
        .pipe(gulp.dest('dist/styles/'))
        .pipe(livereload());
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('src/js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(livereload());
});

// HTML
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: false}))
    .pipe(gulp.dest('dist'))
});

// Copy
gulp.task('copy', function () {
    gulp.src('bower_components/bootstrap-sass/assets/fonts/bootstrap/**')
        .pipe(gulp.dest('dist/fonts/bootstrap/'));

    gulp.src('bower_components/font-awesome-sass/assets/fonts/**')
        .pipe(gulp.dest('dist/fonts/fontawesome/'));

    gulp.src('bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js')
        .pipe(gulp.dest('dist/js/'));

    gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/js/'));
});

// Start
gulp.task('build', ['styles', 'scripts', 'html', 'copy']);

gulp.task('deploy', function() {
    return gulp.src(options.dist + '**/*')
        .pipe(pages());
})

// Default
gulp.task('default', function() {
    livereload.listen();
    gulp.watch("src/*.html", ['html']);
    gulp.watch("src/js/*.js", ['scripts']);
    gulp.watch('src/sass/main.scss', ['styles']);
    gulp.watch('dist/**/*').on('change', livereload.changed);
});
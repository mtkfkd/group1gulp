var gulp = require('gulp');
var sass = require('gulp-sass');
var ejs = require('gulp-ejs');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function(){
  gulp.src('./src/scss/*.scss')
      .pipe(plumber())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(sass({outputStyle : 'expanded'}))
      .pipe(gulp.dest('./html/common/css/'))
      .pipe(browserSync.reload({stream:true}));
});

gulp.task('babel', function(){
  gulp.src('./src/babel/**/*.es6')
      .pipe(plumber())
      .pipe(babel())
      .pipe(gulp.dest('./html/common/js/'))
      .pipe(browserSync.reload({stream:true}));
});

gulp.task('ejs', function(){
  gulp.src(['./src/ejs/**/*.ejs', '!' + './src/ejs/**/_*.ejs'])
      .pipe(plumber())
      .pipe(ejs())
      .pipe(rename("index.html"))
      .pipe(gulp.dest('./html'))
      .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: './html'
    }
  });
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch('src/scss/**/*.scss', ['sass'])
  gulp.watch('src/babel/**/*.es6', ['babel'])
  gulp.watch('src/ejs/**/*.ejs', ['ejs']);
});

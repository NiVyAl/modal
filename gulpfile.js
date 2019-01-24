var gulp = require("gulp");
var sass = require("gulp-sass");
var del = require("del");
var server = require("browser-sync").create();
var plumber = require("gulp-plumber");

gulp.task("css", function() {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest("build"))
    .pipe(server.stream())
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function() {
  return gulp.src([ 
    "source/img/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  
  gulp.watch("source/sass/*.scss", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("build", gulp.series("clean", "html", "css", "copy"));
gulp.task("start", gulp.series("build", "server"));
/** Declare module */

const { src, dest, parallel, watch, series } = require("gulp"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass"),
  pug = require("gulp-pug"),
  browserSync = require("browser-sync").create();

/** Files Path */
const FilesPath = {
  sassFiles: "src/sass/**",
  jsFiles: "src/js/*.js",
  htmlFiles: "src/pug/pages/*.pug",
  htmlAll: "src/pug/**",
  assetsFiles: "assets/**"
};

const { sassFiles, jsFiles, htmlFiles, htmlAll, assetsFiles } = FilesPath;

/** Sass Task */
function sassTask() {
  return src(sassFiles)
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(concat("styles.css"))
    .pipe(dest("public/css"))
    .pipe(browserSync.stream());
}

/** HTML Task */
function htmlTask() {
  return src(htmlFiles)
    .pipe(pug({ pretty: true }))
    .pipe(dest("public"))
    .pipe(browserSync.stream());
}

/** JS Task */
function jsTask() {
  return src(jsFiles).pipe(concat("scripts.js")).pipe(dest("public/js"));
}

/** Assets Task */

function assetsTask() {
  return src(assetsFiles)
      .pipe(dest('public/assets'))

}

/** Watch Task */

function serve() {
  browserSync.init({
    server: {
      baseDir: "public",
    },
  });

  watch(sassFiles, sassTask);
  watch(jsFiles, jsTask);
  watch(htmlAll, htmlTask);
}

exports.js = jsTask;
exports.sass = sassTask;
exports.html = htmlTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask, sassTask, jsTask, assetsTask));
exports.serve = series(serve, parallel(htmlTask, sassTask, jsTask, assetsTask));

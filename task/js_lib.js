const { src, dest } = require("gulp");

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

// Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');

// Обработка JavaScript
const js_lib = () => {
  return src(path.js_lib.src, { sourcemaps: app.isDev })
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'JavaScript',
        message: error.message
      }))
    }))
    .pipe(uglify())
    .pipe(concat('libs.min.js'))
    .pipe(dest(path.js_lib.dest, { sourcemaps: app.isDev }));
}

module.exports = js_lib;
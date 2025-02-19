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
const js = () => {
  return src(path.js.src, { sourcemaps: app.isDev })
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'JavaScript',
        message: error.message
      }))
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest(path.js.dest, { sourcemaps: app.isDev }));
}

module.exports = js;
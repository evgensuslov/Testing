const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

// Конфигурация
const path = require("./config/path.js");
const app = require('./config/app.js');

// Задачи
const clear = require("./task/clear.js");
const pug = require("./task/pug.js");
const scss = require("./task/scss.js");
//const css = require("./task/css.js");
const js = require("./task/js.js");
const js_lib = require("./task/js_lib.js");
const img = require("./task/img.js");
const font = require("./task/font.js");
//const favicon = require("./task/favicon.js");


// Статический сервер
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root
    }
  });
}

// Отслеживание изменений
const watcher = () => {
  watch(path.pug.watch, pug).on('all', browserSync.reload);
  watch(path.scss.watch, scss).on('all', browserSync.reload);
//  watch(path.css.watch, css).on('all', browserSync.reload);
  watch(path.js.watch, js).on('all', browserSync.reload);
  watch(path.img.watch, img).on('all', browserSync.reload);
  watch(path.font.watch, font).on('all', browserSync.reload);
  //watch(path.favicon.watch, favicon).on('all', browserSync.reload);
}


const build = series(
  clear,
  parallel(pug, scss, js, js_lib, font, img)
);

const dev = series(
  build,
  parallel(server, watcher)
);

// Публичные задачи
exports.pug = pug;
exports.scss = scss;
//exports.scss = css;
exports.js = js;
exports.js_lib = js_lib;
exports.img = img;
exports.font = font;
//exports.favicon = favicon;

// Сборка
exports.default = app.isProd
  ? build
  : dev;

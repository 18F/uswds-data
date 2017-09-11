const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');

const webpackConfig = require('./webpack.config');
const staticServerApp = require('./config/static-server').app;
const util = require('./config/gulp/util');

const PORT = process.env.PORT || 4000;
const USWDS_DIST = 'node_modules/uswds/dist';
const USWDS_DIST_DIR = path.join(__dirname, ...USWDS_DIST.split('/'));

function runWebpack(additionalConfig) {
  const config = Object.assign(JSON.parse(JSON.stringify(webpackConfig)),
                               additionalConfig || {});

  return gulp.src(config.entry)
    .pipe(webpack(config))
    .pipe(gulp.dest('./public/js'));
}

gulp.task('webpack', () => runWebpack());

gulp.task('hugo', () => {
  return util.runCmd('hugo', ['']);
});

gulp.task('sass', () => {
  return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        path.join(USWDS_DIST_DIR, 'scss'),
      ]
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('copy-uswds-assets', () => {
  return gulp.src(`${USWDS_DIST}/@(fonts|img)/**/**`)
    .pipe(gulp.dest('./public/vendor/uswds'));
});

gulp.task('watch', ['build'], _ => {
  const rebuildHugo = util.serializedTask('hugo');

  staticServerApp.listen(PORT, () => {
    console.log(`Static server listening on port ${PORT}.`);
  });

  gulp.watch([
    'config.toml',
    'content/**/*',
    'static/**/*',
    'layouts/**/*',
  ], rebuildHugo);

  gulp.watch('./sass/**/*.scss', ['sass']);

  // Note that because running webpack in watch mode causes it to
  // do an initial build, this means that we'll actually be running
  // webpack *twice* on initialization, since webpack is part of the
  // 'build' task too. This is kind of annoying but not as confusing
  // as structuring this gulpfile to avoid the extra build.
  runWebpack({ watch: true });
});

gulp.task('static', [
  'sass',
  'webpack',
  'copy-uswds-assets',
]);

gulp.task('federalist', ['static'], () => {
  // Federalist uses '_site' instead of 'public', so move our
  // pre-generated asset folder.
  //
  // For more details, see:
  //
  // https://github.com/18F/federalist-garden-build/blob/staging/build.sh#L85
  return util.runCmd('mv', ['public', '_site']);
});

gulp.task('build', ['static', 'hugo']);

gulp.task('default', ['build']);

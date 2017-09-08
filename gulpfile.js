const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const yaml = require('js-yaml');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const staticServerApp = require('./config/static-server').app;
const util = require('./config/gulp/util');

const PORT = process.env.PORT || 4000;
const USWDS_DIST = 'node_modules/uswds/dist';
const USWDS_DIST_DIR = path.join(__dirname, ...USWDS_DIST.split('/'));
const JEKYLL_CONFIG = path.join(__dirname, '_config.yml');
const jekyllConfig = yaml.safeLoad(fs.readFileSync(JEKYLL_CONFIG, 'utf8'));
const jekyllExcludes = jekyllConfig.exclude
  .map(glob => `!${util.jekyllToNodeGlob(glob)}`);

gulp.task('jekyll', () => {
  return util.runCmd('bundle', ['exec', 'jekyll', 'build', '-q']);
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
    .pipe(gulp.dest('./css'));
});

gulp.task('copy-uswds-assets', () => {
  return gulp.src(`${USWDS_DIST}/@(fonts|img)/**/**`)
    .pipe(gulp.dest('./vendor/uswds'));
});

gulp.task('watch', ['build'], _ => {
  const rebuildJekyll = util.serializedTask('jekyll');

  staticServerApp.listen(PORT, () => {
    console.log(`Static server listening on port ${PORT}.`);
  });

  gulp.watch([
    '**/*',
    '!_site/**/*',
    '!css/**/*',
    '!vendor/uswds/**/*',
  ].concat(jekyllExcludes), e => {
    // Uncomment the following line to debug over-eager rebuilds.
    // console.log('file changed', e.path);
    rebuildJekyll();
  });

  gulp.watch('./sass/**/*.scss', () => {
    util.runTasks('sass').then(rebuildJekyll);
  });
});

gulp.task('build', [
  'sass',
  'copy-uswds-assets',
], () => {
  return util.runTasks('jekyll');
});

gulp.task('default', ['build']);

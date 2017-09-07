const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const yaml = require('js-yaml');

const staticServerApp = require('./config/static-server').app;
const util = require('./config/gulp/util');

const PORT = process.env.PORT || 4000;
const JEKYLL_CONFIG = path.join(__dirname, '_config.yml');
const jekyllConfig = yaml.safeLoad(fs.readFileSync(JEKYLL_CONFIG, 'utf8'));
const jekyllExcludes = jekyllConfig.exclude
  .map(glob => `!${util.jekyllToNodeGlob(glob)}`);

function buildJekyll() {
  return util.runCmd('bundle', ['exec', 'jekyll', 'build', '-q']);
}

gulp.task('watch', _ => {
  const rebuildJekyll = util.serializedBuild('Jekyll site', buildJekyll);

  staticServerApp.listen(PORT, () => {
    console.log(`Static server listening on port ${PORT}.`);
  });

  gulp.watch([
    '**/*',
    '!_site/**/*',
  ].concat(jekyllExcludes), rebuildJekyll);
});

gulp.task('default', buildJekyll);

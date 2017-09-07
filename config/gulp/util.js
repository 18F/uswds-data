const fs = require('fs');
const child_process = require('child_process');
const chalk = require('chalk');

function jekyllToNodeGlob(glob) {
  try {
    if (fs.lstatSync(glob).isDirectory()) {
      return `${glob}/**/*`;
    }
  } catch (e) {}

  return glob;
}

function runCmd(command, args) {
  args = args || [];
  return new Promise((resolve, reject) => {
    const cmdline = `${command} ${args.join(' ')}`;
    const start = Date.now();
    const child = child_process.spawn(command, args, {
      stdio: 'inherit',
    });
    child.on('error', reject);
    child.on('exit', code => {
      if (code) {
        reject(new Error(`"${cmdline}" exited with code ${code}`));
      } else {
        resolve(Date.now() - start);
      }
    });
  });
}

function buildify(name, startBuild) {
  let currentBuild = null;
  let buildQueued = false;
  const onBuildFinished = () => {
    currentBuild = null;
    if (buildQueued) {
      buildQueued = false;
      console.log(`Rebuilding ${name}...`);
      const start = Date.now();
      currentBuild = startBuild().then(() => {
        const ms = Date.now() - start;
        console.log(`Rebuilt ${name} in ${ms} ms.`);
        onBuildFinished();
      }, err => {
        console.log(chalk.red(`Rebuilding ${name} failed: ${err.message}`));
        onBuildFinished();
      });
    }
  };

  return function build() {
    if (buildQueued) {
      console.log(`Rebuild of ${name} is already scheduled.`);
    } else {
      buildQueued = true;
      if (currentBuild) {
        console.log(`Rebuild of ${name} in progress, scheduling another.`);
      } else {
        onBuildFinished();
      }
    }
  };
}

module.exports = {
  jekyllToNodeGlob,
  runCmd,
  buildify,
};

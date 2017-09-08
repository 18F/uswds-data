const fs = require('fs');
const child_process = require('child_process');
const runSequence = require('run-sequence');
const chalk = require('chalk');

// Run the given command with the given arguments, returning a
// Promise that resolves to the number of milliseconds the
// command took to run.
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

// Returns a function that can be used to trigger a task
// in a serialized way, so that only one instance of the task is
// ever in progress at a time.
//
// If the returned function is called multiple times while the task
// is in progress, at most one additional run of the task is queued
// to be started once the current invocation is finished.
//
// This can be useful in conjunction with watching files.
function serializedTask(name) {
  let currentBuild = null;
  let buildQueued = false;
  const onBuildFinished = () => {
    currentBuild = null;
    if (buildQueued) {
      buildQueued = false;
      currentBuild = runTasks(name).then(onBuildFinished, onBuildFinished);
    }
  };

  return function build() {
    if (buildQueued) {
      console.log(`${name} is already scheduled.`);
    } else {
      buildQueued = true;
      if (currentBuild) {
        console.log(`${name} in progress, scheduling another.`);
      } else {
        onBuildFinished();
      }
    }
  };
}

// This is like runSequence(), but it returns a Promise instead of
// taking a callback.
function runTasks(/* name1, name2, ... */) {
  return new Promise((resolve, reject) => {
    runSequence.apply(null, [...arguments, err => {
      if (err) return reject(err);
      resolve();
    }]);
  });
}

module.exports = {
  runCmd,
  serializedTask,
  runTasks,
};

const fs = require('fs');
const child_process = require('child_process');

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

module.exports = {
  jekyllToNodeGlob,
  runCmd,
};

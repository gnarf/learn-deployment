const fs = require('fs');
const path = require('path');

const wrench = require('wrench');

const render = require('./render');

module.exports = function (exercisesDir, exercises) {
  return function (name, idx) {
    const exercise = exercises[idx];
    const src = path.join(exercisesDir, exercise);
    const dest = path.join(process.cwd(), exercise);
    const overviewFile = path.join(src, 'overview.md');
    const overview = fs.readFileSync(overviewFile, { encoding: 'utf-8' });
    console.log();
    console.log(render(overview));
    var existing;
    try {
      existing = fs.lstatSync(dest).isDirectory();
    } catch (e) {}
    if (!existing) {
      console.log('Copying exercise files...');
      wrench.copyDirSyncRecursive(src, dest);
      console.log('Done.');
    }
  };
};

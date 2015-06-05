#!/usr/bin/env node

const path = require('path');

const terminalMenu = require('terminal-menu');
const R = require('ramda');

const folderToName = require('./lib/folder_to_name');
const choose = require('./lib/choose');

function Learn (configPath) {
  this.config = require(configPath);
  this.config.path = path.join(path.dirname(configPath), this.config.path);
}

Learn.prototype.menu = function () {
  const config = this.config;
  const width = 80
  const exercises = config.exercises;
  const bar = Array(width).join('─');
  const colors = config.meta && config.meta.colors || {};
  const bg = colors.bg || 'blue';
  const fg = colors.fg || 'white';
  const chooseFn = choose(config.path, exercises);
  const menu = terminalMenu({
    width: width,
    bg: bg,
    fg: fg,
    padding: {
      left: 4,
      right: 4,
      top: 2,
      bottom: 2
    }
  });
  menu.on('select', menu.close.bind(menu));
  menu.once('close', function () {
    process.stdin.setRawMode(false);
    process.stdin.end();
  });
  menu.reset();
  menu.write(config.description.toUpperCase()+'\n');
  menu.write(bar+'\n');
  R.forEach(
    R.compose(
      R.partialRight(R.bind(menu.add, menu), chooseFn),
      folderToName
    ),
    exercises
  );
  menu.write(bar+'\n');
  menu.add('HELP');
  menu.add('EXIT');

  process.stdin.setRawMode(true);
  process.stdin.pipe(menu.createStream()).pipe(process.stdout);
}

Learn.prototype.help = function () {
  console.log('Help!');
}

Learn.prototype.exit = function () {

}


module.exports = Learn;

const marked = require('marked');
const markedTerminal = require('marked-terminal');

marked.setOptions({
  renderer: new markedTerminal()
});

module.exports = marked;

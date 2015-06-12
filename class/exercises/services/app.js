const port = process.env.PORT || '8000';
const host = process.env.HOST || '0.0.0.0';

const http = require('http');

const count = {};
function handler (req, res) {
  const url = req.url;
  if (!count[url]) {
    count[url] = 1;
  } else {
    count[url]++;
  }
  console.log(req.method+' '+url);
  res.end([
    '<!doctype html>',
    '<html>',
    '  <head>',
    '    <title>Learn Deployment</title>',
    '  </head>',
    '  <body>',
    '    <h1>Welcome to '+url+'</h1>',
    '    <p>You have been here '+count[url]+' times.</p>',
    '  </body>',
    '</html>'
  ].join('\n'));
};

http.createServer(handler).listen(port, function(){
  console.log('Server running on %s:%d', host, port);
});

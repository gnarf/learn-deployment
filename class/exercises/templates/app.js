const port = process.env.PORT || '8000';
const host = process.env.HOST || '0.0.0.0';

const http = require('http');

var count = 0;
function handler (req, res) {
  count++;
  console.log(req.method+' '+req.url);
  res.end([
    '<!doctype html>',
    '<html>',
    '  <head>',
    '    <title>Learn Deployment</title>',
    '  </head>',
    '  <body>',
    '    <h1>You have been here '+count+' times!</h1>',
    '  </body>',
    '</html>'
  ].join('\n'));
};

http.createServer(handler).listen(port, function(){
  console.log('Server running on %s:%d', host, port);
});

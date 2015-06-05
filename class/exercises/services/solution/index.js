const port = process.env.PORT || '8000';
const host = process.env.HOST || '0.0.0.0';

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(express.static('public'));

app.listen(port, host);

console.log('Server running on, %s:%d', host, port);

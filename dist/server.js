'use strict';

// This will be our application entry. We'll setup our server here.

var app = require('./app'); // The express app we just created

require('babel-polyfill');

var port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, function () {
  return console.log('App started on port ' + port);
});

module.exports = app;
//# sourceMappingURL=server.js.map
'use strict';

require('babel-register');

require('babel-polyfill');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The express app we just created

var port = parseInt(process.env.PORT, 10) || 8000; // This will be our application entry. We'll setup our server here.

_app2.default.listen(port, function () {
  return console.log('App started on port ' + port);
});

module.exports = _app2.default;
//# sourceMappingURL=server.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _index = require('./router/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up the express app
var app = (0, _express2.default)();

// Log requests to console
if (process.env.NODE_ENV !== 'test') {
  app.use((0, _morgan2.default)('dev'));
}
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

// Setup a route that sends back a welcome message in JSON format.
app.get('/api/v1', function (req, res) {
  return res.send({
    status: 200,
    message: 'Welcome to the beginning SendIT app'
  });
});

// route to show documentation on homepage
app.get('/', function (req, res) {
  return res.sendFile(_path2.default.join(__dirname, '../server/documentation/doc.html'));
});

(0, _index2.default)(app);

exports.default = app;
//# sourceMappingURL=app.js.map
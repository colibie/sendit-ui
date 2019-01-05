'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _ENV = require('./ENV');

var _ENV2 = _interopRequireDefault(_ENV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (userPassword) {
  var hashPassword = _crypto2.default.createHash('sha256').update(userPassword).digest(_ENV2.default.base);
  return hashPassword;
}; // Built-in encryption module
//# sourceMappingURL=passwordMiddleware.js.map
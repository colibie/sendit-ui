'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorize = exports.setToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _ENV = require('./ENV');

var _ENV2 = _interopRequireDefault(_ENV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setToken = exports.setToken = function setToken(payload) {
  var tokenTime = 60 * 60 * 24 * 30; // expires in 30 days
  var token = _jsonwebtoken2.default.sign(payload, _ENV2.default.secret, {
    expiresIn: tokenTime
  });
  return token;
};

// eslint-disable-next-line consistent-return
var authorize = exports.authorize = function authorize() {
  var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return function (req, res, next) {
    try {
      var accessToken = req.body.token || req.query.token || req.headers['x-access-token'];
      var data = _jsonwebtoken2.default.verify(accessToken, _ENV2.default.secret);
      req.userData = data;
      if (!roles.includes('user') && !data.admin) return res.status(401).json({ status: 401, error: 'user auth failed' });
      next();
    } catch (error) {
      return res.status(401).json({ status: 401, error: 'user auth failed' });
    }
  };
};
//# sourceMappingURL=accessToken.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _passwordMiddleware = require('../middleware/passwordMiddleware');

var _passwordMiddleware2 = _interopRequireDefault(_passwordMiddleware);

var _admin = require('../joiSchema/admin');

var _admin2 = _interopRequireDefault(_admin);

var _accessToken = require('../middleware/accessToken');

var auth = _interopRequireWildcard(_accessToken);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable no-trailing-spaces */


var Admin = {
  login: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var valid, comparePassword, text, values, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // validate req.body
              valid = _admin2.default.validate(req.body, _admin2.default.login);

              if (!valid) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', res.status(422).json({ status: 422, error: valid }));

            case 3:
              comparePassword = (0, _passwordMiddleware2.default)(req.body.password);
              text = 'SELECT * FROM admins WHERE name = $1 AND password = $2';
              values = [req.body.name, comparePassword];
              _context.prev = 6;
              _context.next = 9;
              return _index2.default.query(text, values);

            case 9:
              _ref2 = _context.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('return', res.status(401).json({ status: 401, error: 'Name/Password Incorrect' }));

            case 13:
              return _context.abrupt('return', res.status(200).json({
                status: 200,
                data: [{
                  token: auth.setToken({ id: rows[0].id, admin: true }),
                  user: rows[0]
                }]

              }));

            case 16:
              _context.prev = 16;
              _context.t0 = _context['catch'](6);
              return _context.abrupt('return', res.status(500).json({ status: 500, error: _context.t0 }));

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[6, 16]]);
    }));

    function login(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return login;
  }()
};

exports.default = Admin;
//# sourceMappingURL=admin.js.map
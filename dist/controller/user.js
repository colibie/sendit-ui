'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _passwordMiddleware = require('../middleware/passwordMiddleware');

var _passwordMiddleware2 = _interopRequireDefault(_passwordMiddleware);

var _doesExist = require('../middleware/doesExist');

var _doesExist2 = _interopRequireDefault(_doesExist);

var _user = require('../joiSchema/user');

var _user2 = _interopRequireDefault(_user);

var _accessToken = require('../middleware/accessToken');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable no-trailing-spaces */


var User = {
  create: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var valid, password, exists, text, values, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // validate req.body
              valid = _user2.default.validate(req.body, _user2.default.signup);

              if (!valid) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', res.status(422).json({ status: 422, error: valid }));

            case 3:
              password = (0, _passwordMiddleware2.default)(req.body.password);
              _context.prev = 4;
              _context.next = 7;
              return (0, _doesExist2.default)('username', req.body.username);

            case 7:
              exists = _context.sent;

              if (!exists) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return', res.status(409).json({ status: 409, error: 'Username already exists' }));

            case 10:
              _context.next = 12;
              return (0, _doesExist2.default)('email', req.body.email);

            case 12:
              exists = _context.sent;

              if (!exists) {
                _context.next = 15;
                break;
              }

              return _context.abrupt('return', res.status(409).json({ status: 409, error: 'Email already exists' }));

            case 15:

              // continue if not duplicates
              text = 'INSERT INTO\n        users(id, firstname, lastname, othernames, password, email, username, registered, createddate, modifieddate)\n        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)\n        returning *';
              values = [(0, _v2.default)(), req.body.firstname, req.body.lastname, req.body.othernames, password, req.body.email, req.body.username, new Date(), new Date(), new Date()];
              _context.prev = 17;
              _context.next = 20;
              return _index2.default.query(text, values);

            case 20:
              _ref2 = _context.sent;
              rows = _ref2.rows;
              return _context.abrupt('return', res.status(201).json({ status: 201, data: rows }));

            case 25:
              _context.prev = 25;
              _context.t0 = _context['catch'](17);
              return _context.abrupt('return', res.status(500).json({ status: 500, error: _context.t0 }));

            case 28:
              _context.next = 33;
              break;

            case 30:
              _context.prev = 30;
              _context.t1 = _context['catch'](4);
              return _context.abrupt('return', res.status(500).json({ status: 500, error: _context.t1 }));

            case 33:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 30], [17, 25]]);
    }));

    function create(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return create;
  }(),
  login: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var valid, comparePassword, text, values, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // validate req.body
              valid = _user2.default.validate(req.body, _user2.default.login);

              if (!valid) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt('return', res.status(422).json({ status: 422, error: valid }));

            case 3:
              comparePassword = (0, _passwordMiddleware2.default)(req.body.password);
              text = 'SELECT * FROM users WHERE email = $1 AND password = $2';
              values = [req.body.email, comparePassword];
              _context2.prev = 6;
              _context2.next = 9;
              return _index2.default.query(text, values);

            case 9:
              _ref4 = _context2.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt('return', res.status(401).json({ status: 401, error: 'Email/Password Incorrect' }));

            case 13:
              return _context2.abrupt('return', res.status(200).json({
                status: 200,
                data: [{
                  token: (0, _accessToken.setToken)({ id: rows[0].id, email: rows[0].email }),
                  user: rows[0]
                }]

              }));

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2['catch'](6);
              return _context2.abrupt('return', res.status(500).json({ status: 500, error: _context2.t0 }));

            case 19:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[6, 16]]);
    }));

    function login(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return login;
  }(),
  getAll: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var text, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              text = 'SELECT * FROM users';
              _context3.prev = 1;
              _context3.next = 4;
              return _index2.default.query(text, []);

            case 4:
              _ref6 = _context3.sent;
              rows = _ref6.rows;
              return _context3.abrupt('return', res.status(200).json({ status: 200, data: rows }));

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3['catch'](1);
              return _context3.abrupt('return', res.status(500).json({ status: 500, error: _context3.t0 }));

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 9]]);
    }));

    function getAll(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return getAll;
  }(),

  //  GET /users/<userId>/parcels. Fetch all parcel delivery order by a specific user.
  getUserparcels: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var text, _ref8, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              text = 'SELECT * FROM parcels where placedby = $1';
              _context4.prev = 1;
              _context4.next = 4;
              return _index2.default.query(text, [req.params.placedby]);

            case 4:
              _ref8 = _context4.sent;
              rows = _ref8.rows;

              if (!(rows[0] && req.userData.id !== rows[0].placedby && !req.userData.admin)) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt('return', res.status(401).json({ status: 401, error: 'user access denied' }));

            case 8:
              return _context4.abrupt('return', res.status(200).json({ status: 200, data: rows }));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4['catch'](1);
              return _context4.abrupt('return', res.status(500).json({ status: 500, error: _context4.t0 }));

            case 14:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[1, 11]]);
    }));

    function getUserparcels(_x7, _x8) {
      return _ref7.apply(this, arguments);
    }

    return getUserparcels;
  }()
};

exports.default = User;
//# sourceMappingURL=user.js.map
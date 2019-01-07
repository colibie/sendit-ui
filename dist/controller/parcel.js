'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _parcel = require('../joiSchema/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _mailer = require('../middleware/mailer');

var _mailer2 = _interopRequireDefault(_mailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var text = 'SELECT p.id, p.placedby, p.weight, p.weightmetric, p.senton, p.deliveredon, p.status,\np.active, p.currentlocation, p.sentfrom, p.sentto, p.description, u.id as user, u.username, u.email \nFROM parcels p \nINNER JOIN users u\nON p.placedby = u.id \nWHERE p.id = $1';

var Parcel = {
  create: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var valid, _text, values, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              valid = _parcel2.default.validate(req.body, _parcel2.default.create);

              if (!valid) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', res.status(422).json({ status: 422, error: valid }));

            case 3:
              _context.prev = 3;
              _text = 'INSERT INTO\n      parcels(id, placedby, weight, weightmetric, senton, currentlocation, sentfrom, sentto, description)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)\n      returning *';
              values = [(0, _v2.default)(), req.userData.id, req.body.weight, req.body.weightmetric, new Date(), req.body.sentfrom, // at the time of sending, currentlocation == sentfrom
              req.body.sentfrom, req.body.sentto, req.body.description];
              _context.prev = 6;
              _context.next = 9;
              return _index2.default.query(_text, values);

            case 9:
              _ref2 = _context.sent;
              rows = _ref2.rows;
              return _context.abrupt('return', res.status(201).json({
                status: 201,
                data: [{
                  id: rows[0].id,
                  message: 'Order created'
                }]
              }));

            case 14:
              _context.prev = 14;
              _context.t0 = _context['catch'](6);
              return _context.abrupt('return', res.status(500).json({ status: 500, error: _context.t0 }));

            case 17:
              _context.next = 22;
              break;

            case 19:
              _context.prev = 19;
              _context.t1 = _context['catch'](3);
              return _context.abrupt('return', res.status(500).json({ status: 500, error: _context.t1 }));

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 19], [6, 14]]);
    }));

    function create(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return create;
  }(),
  getAll: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var text, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              text = 'SELECT p.id, p.placedby, p.weight, p.weightmetric, p.senton, p.currentlocation, p.sentfrom, p.sentto, p.description,\n    u.username, u.email FROM parcels p \n    INNER JOIN users u\n    ON p.placedby = u.id ';
              _context2.prev = 1;
              _context2.next = 4;
              return _index2.default.query(text, []);

            case 4:
              _ref4 = _context2.sent;
              rows = _ref4.rows;
              return _context2.abrupt('return', res.status(200).json({ status: 200, data: rows }));

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](1);
              return _context2.abrupt('return', res.status(500).json({ status: 500, error: _context2.t0 }));

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 9]]);
    }));

    function getAll(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return getAll;
  }(),
  getById: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var _ref6, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _index2.default.query(text, [req.params.parcelId]);

            case 3:
              _ref6 = _context3.sent;
              rows = _ref6.rows;

              if (!(!req.userData.admin && rows[0])) {
                _context3.next = 8;
                break;
              }

              if (!(rows[0].placedby !== req.userData.id)) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt('return', res.status(401).json({ status: 401, error: 'user access denied' }));

            case 8:
              return _context3.abrupt('return', res.status(200).json({ status: 200, data: rows }));

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3['catch'](0);
              return _context3.abrupt('return', res.status(500).json({ status: 500, error: _context3.t0 }));

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 11]]);
    }));

    function getById(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return getById;
  }(),
  changeDestination: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var update, _ref8, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              update = 'UPDATE parcels SET sentto = $1 WHERE id = $2';
              _context4.prev = 1;
              _context4.next = 4;
              return _index2.default.query(update, [req.body.sentto, req.params.parcelId]);

            case 4:
              _context4.next = 6;
              return _index2.default.query(text, [req.params.parcelId]);

            case 6:
              _ref8 = _context4.sent;
              rows = _ref8.rows;

              if (rows[0]) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt('return', res.status(404).json({ status: 404, error: 'Parcel not found' }));

            case 10:
              if (!(req.userData.id !== rows[0].placedby && !req.userData.admin)) {
                _context4.next = 12;
                break;
              }

              return _context4.abrupt('return', res.status(401).json({ status: 401, error: 'user unauthorized' }));

            case 12:
              if (!(rows[0].status === 'delivered')) {
                _context4.next = 14;
                break;
              }

              return _context4.abrupt('return', res.status(409).json({ status: 409, error: 'action not allowed. Parcel already delivered' }));

            case 14:
              (0, _mailer2.default)(rows[0].email, rows[0].id, 'Parcel Destination change', rows[0].sentto);
              return _context4.abrupt('return', res.status(200).json({
                status: 200,
                data: [{
                  id: rows[0].id,
                  sentto: rows[0].sentto,
                  message: 'Parcel destination changed'
                }]
              }));

            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4['catch'](1);
              return _context4.abrupt('return', res.status(500).json({ status: 500, error: _context4.t0 }));

            case 21:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[1, 18]]);
    }));

    function changeDestination(_x7, _x8) {
      return _ref7.apply(this, arguments);
    }

    return changeDestination;
  }(),

  // PATCH  /parcels/<parcelId>/cancel. Cancel a specific parcel delivery order.
  cancel: function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var update, _ref10, rows;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              update = 'UPDATE parcels SET active = $1 WHERE id = $2';
              _context5.prev = 1;
              _context5.next = 4;
              return _index2.default.query(update, [false, req.params.parcelId]);

            case 4:
              _context5.next = 6;
              return _index2.default.query(text, [req.params.parcelId]);

            case 6:
              _ref10 = _context5.sent;
              rows = _ref10.rows;

              if (rows[0]) {
                _context5.next = 10;
                break;
              }

              return _context5.abrupt('return', res.status(404).json({ status: 404, error: 'Parcel not found' }));

            case 10:
              if (!(req.userData.id !== rows[0].placedby && !req.userData.admin)) {
                _context5.next = 12;
                break;
              }

              return _context5.abrupt('return', res.status(401).json({ status: 401, error: 'user unauthorized' }));

            case 12:
              if (!(rows[0].status === 'delivered')) {
                _context5.next = 14;
                break;
              }

              return _context5.abrupt('return', res.status(409).json({ status: 409, error: 'action not allowed. Parcel already delivered' }));

            case 14:

              (0, _mailer2.default)(rows[0].email, rows[0].id, 'Parcel Order Cancellation', false);
              return _context5.abrupt('return', res.status(200).json({
                status: 200,
                data: [{
                  id: rows[0].id,
                  active: rows[0].active,
                  message: 'Parcel order cancelled'
                }]
              }));

            case 18:
              _context5.prev = 18;
              _context5.t0 = _context5['catch'](1);
              return _context5.abrupt('return', res.status(500).json({ status: 500, error: _context5.t0 }));

            case 21:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[1, 18]]);
    }));

    function cancel(_x9, _x10) {
      return _ref9.apply(this, arguments);
    }

    return cancel;
  }(),

  // PATCH  /parcels/<parcelId>/status. Change the status of a specific parcel delivery order.
  // Only the Admin is allowed to access this endpoint.
  // include user email in req.body
  changeStatus: function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
      var update, _ref12, rows;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              update = 'UPDATE parcels SET status = $1 WHERE id = $2';
              _context6.prev = 1;
              _context6.next = 4;
              return _index2.default.query(update, [req.body.status, req.params.parcelId]);

            case 4:
              _context6.next = 6;
              return _index2.default.query(text, [req.params.parcelId]);

            case 6:
              _ref12 = _context6.sent;
              rows = _ref12.rows;

              if (rows[0]) {
                _context6.next = 10;
                break;
              }

              return _context6.abrupt('return', res.status(404).json({ status: 404, error: 'parcel not found' }));

            case 10:
              (0, _mailer2.default)(rows[0].email, rows[0].id, 'Parcel Status change', rows[0].status);
              return _context6.abrupt('return', res.status(200).json({
                status: 200,
                data: [{
                  id: rows[0].id,
                  status: rows[0].status,
                  message: 'Parcel Status Updated'
                }]
              }));

            case 14:
              _context6.prev = 14;
              _context6.t0 = _context6['catch'](1);
              return _context6.abrupt('return', res.status(500).json({ status: 500, error: _context6.t0 }));

            case 17:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this, [[1, 14]]);
    }));

    function changeStatus(_x11, _x12) {
      return _ref11.apply(this, arguments);
    }

    return changeStatus;
  }(),

  // PATCH  /parcels/<parcelId>/currentlocation.
  // Change the present location of a specific parcel delivery order.
  // Only the Admin is allowed to access this endpoint..
  changeLocation: function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
      var update, _ref14, rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              update = 'UPDATE parcels SET currentlocation = $1 WHERE id = $2';
              _context7.prev = 1;
              _context7.next = 4;
              return _index2.default.query(update, [req.body.currentlocation, req.params.parcelId]);

            case 4:
              _context7.next = 6;
              return _index2.default.query(text, [req.params.parcelId]);

            case 6:
              _ref14 = _context7.sent;
              rows = _ref14.rows;

              if (rows[0]) {
                _context7.next = 10;
                break;
              }

              return _context7.abrupt('return', res.status(404).json({ status: 404, error: 'parcel not found' }));

            case 10:

              (0, _mailer2.default)(rows[0].email, rows[0].id, 'Parcel Current Location change', rows[0].currentlocation);
              return _context7.abrupt('return', res.status(200).json({
                status: 200,
                data: [{
                  id: rows[0].id,
                  currentlocation: rows[0].currentlocation,
                  message: 'Parcel location updated'
                }]
              }));

            case 14:
              _context7.prev = 14;
              _context7.t0 = _context7['catch'](1);
              return _context7.abrupt('return', res.status(500).json({ status: 500, error: _context7.t0 }));

            case 17:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this, [[1, 14]]);
    }));

    function changeLocation(_x13, _x14) {
      return _ref13.apply(this, arguments);
    }

    return changeLocation;
  }()
};

exports.default = Parcel;
//# sourceMappingURL=parcel.js.map
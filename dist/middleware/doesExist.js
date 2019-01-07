'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../controller/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // verify if data exists in database


exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key, value) {
    var search, _ref2, rows;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            search = 'SELECT * FROM users WHERE ' + key + ' = $1';
            _context.prev = 1;
            _context.next = 4;
            return _index2.default.query(search, [value]);

          case 4:
            _ref2 = _context.sent;
            rows = _ref2.rows;

            if (!rows[0]) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', true);

          case 8:
            return _context.abrupt('return', false);

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](1);
            return _context.abrupt('return', _context.t0);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=doesExist.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _parcel = require('./parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.use('/api/v1/users', _user2.default);
  app.use('/api/v1/parcels', _parcel2.default);
  app.use('/api/v1/admin', _admin2.default);
};
//# sourceMappingURL=index.js.map
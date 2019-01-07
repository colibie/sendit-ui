'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = {
  validate: function validate(value, schema) {
    var result = _joi2.default.validate(value, schema);
    if (result.error == null) return false;
    return result.error.details[0].message;
  },

  signup: _joi2.default.object().keys({
    firstname: _joi2.default.string().required(),
    lastname: _joi2.default.string().required(),
    othernames: _joi2.default.string().allow(''),
    username: _joi2.default.string().required(),
    email: _joi2.default.string().email().required(),
    password: _joi2.default.string().required()
  }),
  login: _joi2.default.object().keys({
    email: _joi2.default.string().email().required(),
    password: _joi2.default.string().required()
  })
};

exports.default = Schema;
//# sourceMappingURL=user.js.map
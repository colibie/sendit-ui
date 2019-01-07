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

  create: _joi2.default.object().keys({
    weight: _joi2.default.number().required(),
    weightmetric: _joi2.default.string().allow(''),
    sentfrom: _joi2.default.string().required(),
    sentto: _joi2.default.string().required(),
    description: _joi2.default.string().allow('')
  })
};

exports.default = Schema;
//# sourceMappingURL=parcel.js.map
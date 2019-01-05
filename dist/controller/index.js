'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var db = require('../config/database');

var pool = void 0;
exports.default = {
  query: function query(text, options) {
    if (!pool) pool = db();
    return new Promise(function (resolve, reject) {
      pool.query(text, options).then(function (res) {
        return resolve(res);
      }).catch(function (err) {
        return reject(err);
      });
    });
  }
};
//# sourceMappingURL=index.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var pool = require('../config/database').default;

exports.default = {
  query: function query(text, options) {
    if (!pool) pool = pool.connect();
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
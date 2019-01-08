'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var client = require('../config/database').default;

exports.default = {
  query: function query(text, options) {
    if (!client) client = client.connect();
    return new Promise(function (resolve, reject) {
      client.query(text, options).then(function (res) {
        return resolve(res);
      }).catch(function (err) {
        return reject(err);
      });
    });
  }
};
//# sourceMappingURL=index.js.map
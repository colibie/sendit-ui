'use strict';

var _require = require('pg'),
    Pool = _require.Pool; // used cause the code is run from terminal


var secrets = require('../middleware/ENV');

var env = process.env.NODE_ENV || 'development';

var db = env === 'test' ? secrets.testDb : secrets.database;

module.exports = function () {
  var connectionString = {
    user: secrets.user,
    database: db,
    host: secrets.host
  };
  var pool = new Pool(connectionString);
  pool.on('connect', function () {
    return console.log('connected to db');
  });
  return pool;
};
//# sourceMappingURL=database.js.map
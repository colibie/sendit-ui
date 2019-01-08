'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = require('pg'),
    Client = _require.Client; // used cause the code is run from terminal


var secrets = require('../middleware/ENV').default;

var env = process.env.NODE_ENV || 'development';

var connectionString = {
  user: secrets.user,
  database: secrets.testDb,
  host: secrets.host
};
if (env === 'test') {
  connectionString.database = secrets.testDb;
} else if (env === 'development') {
  connectionString.database = secrets.database;
} else {
  connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  };
}

var client = new Client(connectionString);

client.connect();

exports.default = client;
//# sourceMappingURL=database.js.map
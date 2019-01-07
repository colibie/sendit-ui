const { Pool } = require('pg'); // used cause the code is run from terminal
const secrets = require('../middleware/ENV');

const env = process.env.NODE_ENV || 'development';

const db = env === 'test' ? secrets.testDb : secrets.database;

module.exports = () => {
  const connectionString = {
    user: secrets.user,
    database: db,
    host: secrets.host,
  };
  const pool = new Pool(connectionString);
  pool.on('connect', () => console.log('connected to db'));
  return pool;
};

const { Pool } = require('pg'); // used cause the code is run from terminal

const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const db = env === 'test' ? process.env.TESTDB : process.env.DB;

module.exports = () => {
  const connectionString = {
    user: process.env.USER,
    database: db,
    host: process.env.HOST,
  };
  const pool = new Pool(connectionString);
  pool.on('connect', () => console.log('connected to db'));
  return pool;
};

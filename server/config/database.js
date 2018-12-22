const { Pool } = require('pg'); // used cause the code is run from terminal

const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const db = env === 'test' ? 'sendit_test' : 'sendit';
console.log(db);
// dotenv doesnt load here
module.exports = () => {
  const connectionString = {
    user: 'postgres',
    database: db,
    host: 'localhost',
  };
  const pool = new Pool(connectionString);
  pool.on('connect', () => console.log('connected to db'));
  return pool;
};

const { Pool } = require('pg'); // used cause the code is run from terminal

const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const secrets = require(`../middleware/ENV${env}.json`);

module.exports = () => {
  const connectionString = {
    user: secrets.user,
    database: secrets.database,
    host: secrets.host,
  };
  const pool = new Pool(connectionString);
  pool.on('connect', () => console.log('connected to db'));
  return pool;
};

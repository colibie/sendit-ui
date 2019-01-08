const { Pool } = require('pg'); // used cause the code is run from terminal
const secrets = require('../middleware/ENV').default;

const env = process.env.NODE_ENV || 'development';

let connectionString = {
  user: secrets.user,
  database: secrets.testDb,
  host: secrets.host,
};
if (env === 'test') {
  connectionString.database = secrets.testDb;
} else if (env === 'production') {
  connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  };
} else {
  connectionString.database = secrets.database;
}

// const db = env === 'test' ? secrets.testDb :
// env === 'production' ? process.env.DATABASE_URL : secrets.database;

module.exports = () => {
  const pool = new Pool(connectionString);
  pool.on('connect', () => console.log('connected to db'));
  return pool;
};

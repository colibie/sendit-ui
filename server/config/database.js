const { Client } = require('pg'); // used cause the code is run from terminal
const secrets = require('../middleware/ENV').default;

const env = process.env.NODE_ENV || 'development';

let connectionString = {
  user: secrets.user,
  database: secrets.testDb,
  host: secrets.host,
};
if (env === 'test') {
  connectionString.database = secrets.testDb;
} else if (env === 'development') {
  connectionString.database = secrets.database;
} else {
  connectionString = `${process.env.DATABASE_URL}?ssl=true`;
}

// const db = env === 'test' ? secrets.testDb :
// env === 'production' ? process.env.DATABASE_URL : secrets.database;
const client = new Client(connectionString);

client.connect();

export default client;
// module.exports = () => {
//   const client = new Client(connectionString);
//   client.on('connect', () => console.log('connected to db'));
//   return client;
// };

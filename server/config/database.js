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
  connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  };
}

const client = new Client(connectionString);

client.connect();

export default client;

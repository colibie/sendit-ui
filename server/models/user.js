const database = require('../config/database');

const pool = database();

// create table item in database
const createTable = () => {
  const queryText = 'CREATE TABLE IF NOT EXISTS users ('
    + 'id UUID PRIMARY KEY,'
    + 'firstname varchar(80) NOT NULL,'
    + 'lastname varchar(80) NOT NULL,'
    + 'othernames varchar(80),'
    + 'password varchar(80) NOT NULL,'
    + 'email varchar(80) NOT NULL,'
    + 'username varchar(80) NOT NULL,'
    + 'registered DATE NOT NULL,'
    + 'isAdmin BOOLEAN DEFAULT false,'
    + 'createdDate TIMESTAMP,'
    + 'modifiedDate TIMESTAMP )';
  // eslint-disable-next-line semi
  // eslint-disable-next-line no-unused-expressions
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// drop database table
const dropTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTable,
  dropTable
};

// eslint-disable-next-line import/no-extraneous-dependencies
require('make-runnable');

const database = require('../config/database');

const pool = database();

// create table item in database
const createTable = () => {
  const queryText = 'CREATE TABLE IF NOT EXISTS parcels ('
    + 'id UUID PRIMARY KEY,'
    + 'placedby UUID FOREIGN KEY references users(id) NOT NULL,'
    + 'weight double NOT NULL,'
    + 'weightmetric text default kg NOT NULL,'
    + 'senton timestamp NOT NULL,'
    + 'deliveredon timestamp,'
    + 'status text default placed,' // placed, transiting or delivered
    + 'active boolean default true,'
    + 'currentlocation text NOT NULL,'
    + 'sentfrom text NOT NULL,'
    + 'sentto text NOT NULL,'
    + 'description text)';
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
  const queryText = 'DROP TABLE IF EXISTS parcels';
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

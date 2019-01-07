'use strict';

var database = require('../config/database');

var pool = database();

// create table item in database
var createTable = function createTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS parcels (' + 'id UUID PRIMARY KEY,' + 'placedby UUID FOREIGN KEY references users(id) NOT NULL,' + 'weight double NOT NULL,' + 'weightmetric text default kg NOT NULL,' + 'senton timestamp NOT NULL,' + 'deliveredon timestamp,' + 'status text default placed,' // placed, transiting or delivered
  + 'active boolean default true,' + 'currentlocation text NOT NULL,' + 'sentfrom text NOT NULL,' + 'sentto text NOT NULL,' + 'description text)';
  // eslint-disable-next-line semi
  // eslint-disable-next-line no-unused-expressions
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

// drop database table
var dropTable = function dropTable() {
  var queryText = 'DROP TABLE IF EXISTS parcels';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

pool.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTable: createTable,
  dropTable: dropTable
};

// eslint-disable-next-line import/no-extraneous-dependencies
require('make-runnable');
//# sourceMappingURL=parcel.js.map
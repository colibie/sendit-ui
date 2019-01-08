'use strict';

var database = require('../config/database');

var pool = database();

// create table item in database
var createTable = function createTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS users (' + 'id UUID PRIMARY KEY,' + 'firstname varchar(80) NOT NULL,' + 'lastname varchar(80) NOT NULL,' + 'othernames varchar(80),' + 'password varchar(80) NOT NULL,' + 'email varchar(80) NOT NULL,' + 'username varchar(80) NOT NULL,' + 'registered DATE NOT NULL,' + 'isAdmin BOOLEAN DEFAULT false,' + 'createdDate TIMESTAMP,' + 'modifiedDate TIMESTAMP )';
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
  var queryText = 'DROP TABLE IF EXISTS users';
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
//# sourceMappingURL=user.js.map
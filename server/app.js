import express from 'express';

import logger from 'morgan';

import bodyParser from 'body-parser';

import pg from './config/database';

// Set up the express app
const app = express();

// Log requests to console
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

// connect to db
pg();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.send({
  status: 200,
  message: 'Welcome to the beginning SendIT app',
}));

export default app;

// This will be our application entry. We'll setup our server here.

import 'babel-polyfill';

import app from './app'; // The express app we just created

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, () => console.log(`App started on port ${port}`));

module.exports = app;

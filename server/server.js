// This will be our application entry. We'll setup our server here.
// import https from 'https';
// import fs from 'fs';
import app from './app'; // The express app we just created

const port = parseInt(process.env.PORT, 10) || 8000;

// const options = {
//   pfx: fs.readFileSync('C:\\Windows\\System32\\localhostcert.pfx'),
//   passphrase: 'password1234'
// };

// https.createServer(options, app)
// .listen(port, () => console.log(`secure app is running on ${port}`));
app.listen(port, () => console.log(`app is running on ${port}`));

module.exports = app;

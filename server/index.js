'use strict';
const app = require('./app');
const db = require('../db');
const path = require('path');
const PORT = process.env.PORT || 3000;

const formidable = require('formidable'); // JEE ADDED
const fs = require('fs'); // JEE ADDED
const pg = require('pg');



// const client = new pg.Client({
//   database: process.env.DATABASE_DB || require('../config/development.json').postgresql.DATABASE_DB,
//   user: process.env.DATABASE_USER || require('../config/development.json').postgresql.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD || require('../config/development.json').postgresql.DATABASE_PASSWORD,
//   host: process.env.DATABASE_HOST || require('../config/development.json').postgresql.DATABASE_HOST,
//   port: 5432,
//   ssl: true,
//   url: 'postgres://dciguifphqlpec:2448fb280f27d215544c2845eaa58e3c07ca19967aa06dc8cd2c6fe61273550a@ec2-174-129-224-33.compute-1.amazonaws.com:5432/dd7hrl5p7gm49v?ssl=true&amp;sslfactory=org.postgresql.ssl.NonValidatingFactory' || require('../config/development.json').postgresql.DATABASE_URL
// });

const client = new pg.Client({
  database: "dd7hrl5p7gm49v",
  user: "dciguifphqlpec",
  password: "2448fb280f27d215544c2845eaa58e3c07ca19967aa06dc8cd2c6fe61273550a",
  host: "ec2-174-129-224-33.compute-1.amazonaws.com",
  port: 5432,
  ssl: true,
  url: 'postgres://dciguifphqlpec:2448fb280f27d215544c2845eaa58e3c07ca19967aa06dc8cd2c6fe61273550a@ec2-174-129-224-33.compute-1.amazonaws.com:5432/dd7hrl5p7gm49v?ssl=true&amp;sslfactory=org.postgresql.ssl.NonValidatingFactory'
});

client.connect();

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/companyInfo', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// JEE ADDED
app.post('/fileUpload', (req, res) => {

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  form.on('progress', function(bytesReceived, bytesExpected) {
    var percent_complete = (bytesReceived / bytesExpected) * 100;
    console.log(percent_complete.toFixed(2));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('File uploaded');
  });

  // parse the incoming request containing the form data
  form.parse(req);
});

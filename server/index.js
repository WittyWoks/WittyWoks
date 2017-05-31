'use strict';
const app = require('./app');
const db = require('../db');
const path = require('path');
const PORT = process.env.PORT || 3000;
const formidable = require('formidable'); // JEE ADDED
const fs = require('fs'); // JEE ADDED



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

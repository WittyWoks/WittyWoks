'use strict';
const app = require('./app');
const db = require('../db');
const path = require('path');
const PORT = process.env.PORT || 3000;
const pg = require('pg');
const keys = require('../config/development.json');
const axios = require('axios');
const request = require('request');


const client = new pg.Client({
  database: process.env.DATABASE_DB || require('../config/development.json').postgresql.DATABASE_DB,
  user: process.env.DATABASE_USER || require('../config/development.json').postgresql.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD || require('../config/development.json').postgresql.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST || require('../config/development.json').postgresql.DATABASE_HOST,
  port: 5432,
  ssl: true,
  url: process.env.DATABASE_URL +'ssl=true&amp;sslfactory=org.postgresql.ssl.NonValidatingFactory' || require('../config/development.json').postgresql.DATABASE_URL
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


// API CALLS
app.get('/glassDoor', (req, res) => {
  // console.log('REQ---', req.query.search);
  axios.get(`http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=${keys.glassDoor.PARTNER_ID}&t.k=${keys.glassDoor.API_KEY}&action=employers&q=${req.query.search}&userip=192.168.43.42&useragent=Mozilla/%2F4.0`)
    .then(result => {
      let data = result.data.response.employers;
      // console.log('Data from glassdoor', result.data.response.employers);
      res.status(200).send(data);
    })
    .catch(err => {
      console.error('Error occured getting data', err);
    });
});

app.get('/indeed', (req, res) => {
  let location = req.query.location || 'San Francisco, CA';
  let jobOptions = {
    method: 'get',
    url: `https://indeed-indeed.p.mashape.com/apisearch?publisher=2321237742722632&callback=<required>&chnl=<required>&co=<required>&filter=<required>&format=json&fromage=<required>&highlight=<required>&jt=<required>&l=${location}&latlong=<required>&limit=<required>&q=${req.query.search}&radius=25&sort=<required>&st=<required>&start=<required>&useragent=<required>&userip=<required>&v=2`,
    headers: {
      'X-Mashape-Key': 'bJeQs4UvZFmsh84cu83JnIuzm4G8p1wjsRDjsncP8KbHtTSmdX',
      'Accept': 'application/json'
    }
  };
  request(jobOptions, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      body = JSON.parse(body);
      res.send(body.results);
    }
  });
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

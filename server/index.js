'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.PORT || 3000;
// <<<<<<< HEAD
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

//=======

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});
//>>>>>>> (cleanup) move endpoint routes from server/index to server/routes/api

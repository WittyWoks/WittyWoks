'use strict';
const express = require('express');
const router = express.Router();
const path = require('path'); // JC ADDED
const fs = require('fs'); // JEE ADDED
const pdfParser = require('../pdfparse.js'); // BB ADDED
const axios = require('axios'); // AE ADDED
const request = require('request'); // AE ADDED
const Jobs = require('../../db/models/jobs'); //BB ADDED
const aws = require('aws-sdk'); // BB ADDED
const Promise = require('bluebird');
const S3_BUCKET = 'resumeswittywoks'; //BB ADDED
const userInfo = require('../middleware/passport');
const Gmail = require('node-gmail-api');
var Base64 = require('js-base64').Base64;
var utf8 = require('utf8');


const GD_PARTNER_ID = process.env.GD_PARTNER_ID || require('../../config/development.json').glassDoor.PARTNER_ID;
const GD_API_KEY = process.env.GD_API_KEY || require('../../config/development.json').glassDoor.API_KEY;
const IN_MASHAPE = process.env.IN_MASHAPE || require('../../config/development.json').indeed['X-Mashape-Key'];
const IN_PUB_KEY = process.env.IN_PUB_KEY || require('../../config/development.json').indeed.PUBLISHER_KEY;
const AWS_API_KEY = process.env.AWS_API_KEY || require('../../config/development.json').AWS.ACCESS_KEY_ID;
const AWS_SECRET = process.env.AWS_SECRET || require('../../config/development.json').AWS.SECRET_ACCESS_KEY;
const convertJobsToClientSideForm = require('../controllers/jobs').convertJobsToClientSideForm;
const getIndeedJobs = require('../controllers/jobs').getIndeedJobs;
const retrieveTopTenJobsFromDatabase = require('../controllers/jobs').retrieveTopTenJobsFromDatabase;

router.route('/')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

router.route('/dashboard')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

router.route('/resume')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

router.route('/jobhistory')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

router.route('/smartanalysis')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

router.route('/home')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

router.route('/glassDoor')
  .get((req, res) => {
    // console.log('REQ---', req.query.search);
    axios.get(`http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=${GD_PARTNER_ID}&t.k=${GD_API_KEY}&action=employers&q=${req.query.search}&userip=192.168.43.42&useragent=Mozilla/%2F4.0`)
      .then(result => {
        let data = result.data.response.employers;
        // console.log('Data from glassdoor', result.data.response.employers);
        res.status(200).send(data);
      })
      .catch(err => {
        console.error('Error occured getting data', err);
      });
  });


router.route('/indeed')
  .get((req, res) => {
    getIndeedJobs(req.query.search, req.query.location)
      .then(jobs => {
        res.send(jobs);
      });
  });

router.route('/indeedTopTen')
  .get((req, res) => {
    retrieveTopTenJobsFromDatabase()
      .then(jobs => {
        console.log('jobs indeedtopten', jobs);
        res.send(jobs);
      })
      .catch(err => {
        console.log(err);
        res.end();
      });
  });

router.route('/sign-s3')
  .get((req, res) => {
    aws.config.update({
      accessKeyId: AWS_API_KEY,
      secretAccessKey: AWS_SECRET,
      region: 'us-west-1'
    });
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3-us-west-1.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });

module.exports = router;

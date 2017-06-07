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
const S3_BUCKET = 'resumeswittywoks'; //BB ADDED
const userInfo = require('../middleware/passport');
const GD_PARTNER_ID = process.env.GD_PARTNER_ID || require('../../config/development.json').glassDoor.PARTNER_ID;
const GD_API_KEY = process.env.GD_API_KEY || require('../../config/development.json').glassDoor.API_KEY;
const IN_MASHAPE = process.env.IN_MASHAPE || require('../../config/development.json').indeed['X-Mashape-Key'];
const IN_PUB_KEY = process.env.IN_PUB_KEY || require('../../config/development.json').indeed.PUBLISHER_KEY;
const AWS_API_KEY = process.env.AWS_API_KEY || require('../../config/development.json').AWS.ACCESS_KEY_ID;
const AWS_SECRET = process.env.AWS_SECRET || require('../../config/development.json').AWS.SECRET_ACCESS_KEY;


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

router.route('/analytics')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

router.route('/settings')
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

var convertJobsToClientSideForm = function(jobs) {
  var convertedJobs = [];
  jobs.models.forEach(job => {
    var job = job.attributes;
    var jobChanged = { 
      jobtitle: job.title,
      company: job.company || 'Prestige WorldWide',
      city: job.city || 'San Francisco',
      snippet: job.description, 
      url: job.url,
      formattedLocation: job.formatted_location || 'San Francisco, CA',
      formattedTime: job.formatted_time || '2 million years ago'
    };
    convertedJobs.push(jobChanged);
  });
  return convertedJobs;
};

router.route('/indeed')
  .get((req, res) => {
    

  // first check and see if it exists in the database for specified location. 
  // // if it does, perform get jobs from database. If not, get jobs from http request to indeed;
  //   Jobs
  // .query(qb => {
  //   qb.limit('10');
  //   //need to query by lcoation, as well. get from req.query.location
  // })  
  // .fetchAll()
  // .then(x => {
  //   return convertJobsToClientSideForm(x);
  // })
  // .then(jobs => {
  //   res.send(jobs);
  // });
  

    let location = req.query.location || 'San Francisco, CA';
    let jobOptions = {
      method: 'get',
      url: `https://indeed-indeed.p.mashape.com/apisearch?publisher=${IN_PUB_KEY}&callback=<required>&chnl=<required>&co=<required>&filter=<required>&format=json&fromage=<required>&highlight=<required>&jt=<required>&l=${location}&latlong=<required>&limit=<required>&q=${req.query.search}&radius=25&sort=<required>&st=<required>&start=<required>&useragent=<required>&userip=<required>&v=2`,
      headers: {
        'X-Mashape-Key': IN_MASHAPE,
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

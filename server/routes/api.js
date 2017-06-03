'use strict';
const express = require('express');
const router = express.Router();
const path = require('path'); // JC ADDED
const formidable = require('formidable'); // JEE ADDED
const fs = require('fs'); // JEE ADDED
const pdfParser = require('../pdfparse.js'); // BB ADDED
// const keys = require('../../config/development.json'); // AE ADDED
const axios = require('axios'); // AE ADDED
const request = require('request'); // AE ADDED
const aws = require('aws-sdk'); // BB ADDED
const S3_BUCKET = 'resumeswittywoks'; //BB ADDED
const userInfo = require('../middleware/passport');
const GD_PARTNER_ID = process.env.GD_PARTNER_ID || require('../../config/development.json').glassDoor.PARTNER_ID;
const GD_API_KEY = process.env.GD_API_KEY || require('../../config/development.json').glassDoor.API_KEY;
const IN_MASHAPE = process.env.IN_MASHAPE || require('../../config/development.json').indeed.X-Mashape-Key;
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

router.route('/fileUpload')
  .post((req, res) => {
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.uploadDir = path.join(__dirname, '../../uploads');

    form.on('file', function(field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name));
      pdfParser.parsePDF(file.name, function(skills) {
        res.json(skills);
      });
    });

    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });
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

router.route('/user')
  .get((req, res) => {
    res.end(userInfo.userInfo.displayName);
  });

module.exports = router;

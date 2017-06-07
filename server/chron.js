var CronJob = require('cron').CronJob;
var Promise = require('bluebird');
var request = require("request");
var axios = require('axios');
var Jobs = require('../db/models/jobs')
var IN_PUB_KEY = require('../config/development.json').indeed['PUBLISHER_KEY']
var IN_MASHAPE = require('../config/development.json').indeed['X-Mashape-Key']
const GD_PARTNER_ID = process.env.GD_PARTNER_ID || require('../config/development.json').glassDoor.PARTNER_ID;
const GD_API_KEY = process.env.GD_API_KEY || require('../config/development.json').glassDoor.API_KEY;
const location = 'San Francisco';

var callIndeed = function(location) {
  //only works for 1 word locatons right now....
  return new Promise(function(resolve, reject) {
    let jobOptions = {
      method: 'get',
      url: `https://indeed-indeed.p.mashape.com/apisearch?publisher=${IN_PUB_KEY}&callback=<required>&chnl=<required>&co=<required>&filter=<required>&format=json&fromage=<required>&highlight=<required>&jt=<required>&l=${location}&latlong=<required>&limit=10&q=top+ten+jobs&radius=25&sort=<required>&st=<required>&start=<required>&useragent=<required>&userip=<required>&v=2`,
      headers: {
        'X-Mashape-Key': IN_MASHAPE,
        'Accept': 'application/json'
      }
    };
        request(jobOptions, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            var body = JSON.parse(body);
            resolve(body.results);
          }        
        })
    })
}

var job = new CronJob({
  cronTime: '00 27 15 * * 1-7',
    onTick: function() {
      // ideally first delete top Ten Jobs for San Francisco
      callIndeed('san francisco')
        .then(data => {
          data.forEach(job => {
            jobs.forge({
              title: job.jobtitle,
              description: job.snippet,
              // url: job.url,
              // company: job.company,
              // city: job.city 
              // formatted_time: job.formattedTime
              // formatted_location: job.formattedLocation
            }).save()
            .then(function(newrow) {
              // console.log('inserted row!')
            })
            .catch(function(err) {
              console.log('error!', err);
            })
          });
        })
        .catch(err => {
          console.log(err)
        })

  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();

var convertJobsToClientSideForm = function(jobs) {
  var convertedJobs = [];
  jobs.models.forEach(job => {
    var job = job.attributes;
    var jobChanged = { 
      jobtitle: job.title,
      company: job.company || 'tbd',
      city: job.city || 'tbd',
      snippet: job.description, 
      url: job.url
    }
      convertedJobs.push(jobChanged)
    })
  return convertedJobs
}

// callIndeed('san francisco')
//         .then(data => {
//           console.log(data)
//         })
// Jobs
//   .query(function(qb) {
//     qb.limit('2');
//   })  
//   .fetchAll()
//   .then(function(x) {
//     return convertJobsToClientSideForm(x)
//   })
//   .then(jobs => {
//     console.log(jobs)
//   })

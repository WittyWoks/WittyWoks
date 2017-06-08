var CronJob = require('cron').CronJob;
var Promise = require('bluebird');
var request = require('request');
var axios = require('axios');
var Jobs = require('../db/models/jobs');
var IN_PUB_KEY = process.env.IN_PUB_KEY || require('../config/development.json').indeed['PUBLISHER_KEY'];
var IN_MASHAPE = process.env.IN_MASHAPE || require('../config/development.json').indeed['X-Mashape-Key'];
const GD_PARTNER_ID = process.env.GD_PARTNER_ID || require('../config/development.json').glassDoor.PARTNER_ID;
const GD_API_KEY = process.env.GD_API_KEY || require('../config/development.json').glassDoor.API_KEY;
const getIndeedJobs = require('./controllers/jobs').getIndeedJobs;

var job = new CronJob({
  cronTime: '00 37 17 * * 1-7',
  onTick: function() {
    // ideally first delete top Ten Jobs for San Francisco
    getIndeedJobs()
      .then(data => {
        data.forEach(job => {
          Jobs.forge({
            title: job.jobtitle,
            description: job.snippet,
            url: job.url,
            company: job.company,
            city: job.city, 
            formatted_time: job.formattedRelativeTime,
            formatted_location: job.formattedLocation,
          }).save()
          .then(function(newrow) {
            console.log('inserted row!');
          })
          .catch(function(err) {
            console.log('error!', err);
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();

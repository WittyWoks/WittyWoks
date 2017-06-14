const IN_PUB_KEY = process.env.IN_PUB_KEY || require('../../config/development.json').indeed.PUBLISHER_KEY; // BB Added
const IN_MASHAPE = process.env.IN_MASHAPE || require('../../config/development.json').indeed['X-Mashape-Key']; //BB Added
const request = require('request'); // BB ADDED
const Jobs = require('../../db/models/jobs'); //BB ADDED

const convertJobsToClientSideForm = (jobs) => {
  let convertedJobs = [];
  jobs.models.forEach(jobData => {
    let job = jobData.attributes;
    let jobChanged = { 
      jobtitle: job.title,
      company: job.company,
      city: job.city,
      snippet: job.description, 
      url: job.url,
      formattedLocation: job.formatted_location,
      formattedRelativeTime: job.formatted_time,
      date: job.date
    };
    convertedJobs.push(jobChanged);
  });
  return convertedJobs;
};

const getIndeedJobs = (search='top ten jobs', location, radius) => {
  let locationExpression = '';
  let radiusExpression = '';
  location ? locationExpression = `&l=${location}` : locationExpression = '';
  radius ? radiusExpression = `&radius=${radius}` : radiusExpression = '';
  return new Promise((resolve, reject) => {
    let jobOptions = {
      method: 'get',
      url: `https://indeed-indeed.p.mashape.com/apisearch?publisher=${IN_PUB_KEY}&callback=<required>&chnl=<required>&co=<required>&filter=<required>&format=json&fromage=<required>&highlight=<required>&jt=<required>${locationExpression}&latlong=<required>&limit=25&q=${search}${radiusExpression}&sort=<required>&st=<required>&start=<required>&useragent=<required>&userip=<required>&v=2`,
      headers: {
        'X-Mashape-Key': IN_MASHAPE,
        'Accept': 'application/json'
      }
    };
    request(jobOptions, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        let parsedBody = JSON.parse(body);
        resolve(parsedBody.results);
      }        
    });
  });
};

const retrieveTopTenJobsFromDatabase = () => {
  return new Promise((resolve, reject) => {
    Jobs
      .query(qb => {
        qb.limit('25');
      })  
      .fetchAll()
      .then(x => {
        return convertJobsToClientSideForm(x);
      })
      .then(jobs => {
        resolve(jobs);
      })
      .catch(err => {
        reject(err);
      });
  });
};


module.exports.convertJobsToClientSideForm = convertJobsToClientSideForm;
module.exports.getIndeedJobs = getIndeedJobs;
module.exports.retrieveTopTenJobsFromDatabase = retrieveTopTenJobsFromDatabase;
// const models = require('../../db/models');
//
// module.exports.getAll = (req, res) => {
//   models.jobs.fetchAll()
//     .then(profiles => {
//       res.status(200).send(profiles);
//     })
//     .catch(err => {
//       // This code indicates an outside service (the database) did not respond in time
//       res.status(503).send(err);
//     });
// };
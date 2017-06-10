const models = require('../../db/models');

module.exports.create = (req, res) => {
  models.appliedJobs.forge({
    status: 'Applied',
    user_id: req.google_id,
    applied_id: req.jobId,
    job_data: req.jobData
  }).save()
  .then(() => {
    console.log('Row Inserted!');
  });
};


module.exports.getAll = (req, res) => {
  // console.log('INSIDE CONTROLLER', req.query)
  models.appliedJobs.where({ user_id: req.query.google_id}).fetchAll()
    .then((data) => {
      console.log('Here you go!');
      res.status(200).send(data);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

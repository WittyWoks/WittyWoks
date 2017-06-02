const models = require('../../db/models');

module.exports.create = (req, res) => {
  models.appliedJobs.forge({ status: req.body.status, applied_id: req.body.email_id, user_id:req.body.google_id })
    .save()
    .then(result => {
      res.status(201).send(result.omit('job_saved'));
    })
    .catch(err => {
      if (err.constraint === 'not saved') {
        return res.status(403);
      }
      res.status(500).send(err);
    });
};


module.exports.getAll = (req, res) => {
  models.appliedJobs.where({ user_id: req.body.google_id  }).fetch()
    .then(() => {
      res.status(200).send(profiles);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

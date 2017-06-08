const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Resume.fetchAll()
    .then(resume => {
      res.status(200).send(resume);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.addResume = (req, res) => {
  // console.log('REQ', req)
  return models.Profile.where({id: req.user_id}).fetch({
    withRelated: 'resumes'
  })
  .then((profile) => {
    models.Resume.forge({
      location: 'San Francisco, CA',
      skills: req.skills.join(','),
      keywords: 'software engineer',
      resume_url: req.pdfUrl
    }).save()
    .tap(resume => {
      return profile.save({resume_id: resume.get('id')});
    })
    .then(() => {
      console.log('row inserted!');
    });
  });
};

module.exports.getResume = (req, res) => {
  return models.Resume.where({id: req.resume_id}).fetch()
    .then(resume => {
      res.status(200).send(resume.attributes);
    });
};
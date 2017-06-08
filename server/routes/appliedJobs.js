'use strict';
const express = require('express');
const router = express.Router();
const appliedJobsController = require('../controllers').appliedJobs;

router.route('/ReturnJobsApplied')
  .post((req, res) => {
    appliedJobsController.create(req.body);
  })
  .get(appliedJobsController.getAll)
  ;

module.exports = router;

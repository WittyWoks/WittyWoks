'use strict';
const express = require('express');
const router = express.Router();
const appliedJobsController = require('../controllers').appliedJobs;


router.route('/ReturnJobsApplied')
  .post(appliedJobsController.create)
  .get(appliedJobsController.getAll)
  // .post(ProfileController.create)
  ;

module.exports = router;

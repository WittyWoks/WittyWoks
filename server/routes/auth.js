const express = require('express');
const middleware = require('../middleware');
const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    res.redirect('/dashboard');
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

module.exports = router;

const express = require('express');
const middleware = require('../middleware');
const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    res.redirect('/dashboard'); // IF VERIFIED, GO HERE!
  });

router.route('/logout')
  .get((req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log('Error destroying session', err);
        throw err;
      }
      res.redirect('/');
    });
  });

router.route('/user')
  .get(middleware.auth.verify, (req, res) => {
    res.json(req.user);
  });


// scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/gmail.modify','https://www.googleapis.com/auth/calendar']
// scope: ['profile', 'https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/calendar']
router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.modify','https://www.googleapis.com/auth/calendar']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/dashboard',
  failureRedirect: '/'
}));


module.exports = router;

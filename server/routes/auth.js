const express = require('express');
const middleware = require('../middleware');
const router = express.Router();
const app = express();
const profiles = require('../middleware/passport.js');

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    res.redirect('/home');
  });

router.route('/logout')
  .get((req, res) => {
    req.session.destroy(function (err) {
    profiles.userInfo = null;
    res.redirect('/');

  });
});

// scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/gmail.modify','https://www.googleapis.com/auth/calendar']
// ['profile', 'email']
router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['profile', 'https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/calendar']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/dashboard',
  failureRedirect: '/'
}));

module.exports = router;

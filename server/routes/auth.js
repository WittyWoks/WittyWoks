// const express = require('express');
// const middleware = require('../middleware');
// const router = express.Router();
// const app = express();
// const profiles = require('../middleware/passport.js');

// router.route('/')
//   .get(middleware.auth.verify, (req, res) => {
//     console.log('INSIDE ROUTES... / !!!!!!!!!', req.body)
//     res.redirect('/home');
//   });

// router.route('/logout')
//   .get((req, res) => {
//     req.session.destroy(function (err) {
//     profiles.userInfo = null;
//     console.log('INSIDE ROUTES... / !!!!!!!!', req.body)
//     res.redirect('/');
//   });
// });

// // scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/gmail.modify','https://www.googleapis.com/auth/calendar']
// // ['profile', 'email']
// // scope: ['profile', 'https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/calendar']
// // scope: ['profile', 'email']
// router.get('/auth/google', middleware.passport.authenticate('google', {
//   scope: ['profile', 'email']
// }));

// router.get('/auth/google/callback', middleware.passport.authenticate('google', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/'
// }));

// module.exports = router;

const express = require('express');
const middleware = require('../middleware');
const profiles = require('../middleware/passport.js');
const router = express.Router();
// const userInfo = require('../middleware/passport');

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    res.redirect('/dashboard'); // IF VERIFIED, GO HERE!
  });

router.route('/logout')
  .get((req, res) => {
    // req.logout();
    // res.redirect('/');
    req.session.destroy((err) => {
      if (err) {
        console.log('Error destroying session', err)
      }
      // profiles.userInfo = null;
      res.redirect('/')
    });
  });

/* THIS IS A TEST!!!!!!!!!!!! */
router.route('/user')
  .get(middleware.auth.verify, (req, res) => {
    // res.render('profile.ejs', {
    //   user: req.user // get the user out of session and pass to template
    // });
    // req.user.avatar = (userInfo.userInfo.photos[0].value).split('?')[0] + '?sz=100';
    res.json(req.user)
  });

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

/* THIS IS A TEST!!!!!!!!!!!! */
router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/dashboard',
  failureRedirect: '/'
}));


module.exports = router;

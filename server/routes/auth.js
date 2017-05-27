const express = require('express');
const middleware = require('../middleware');
const router = express.Router();
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'));
})

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    res.redirect('/dashboard');
  });

router.route('/login')
  .get((req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));


router.route('/profile')
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
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

module.exports = router;

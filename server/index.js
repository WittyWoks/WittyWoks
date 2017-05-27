
'use strict';
const app = require('./app');
const db = require('../db');
const path = require('path');
const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/companyInfo', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

// //----- Basic Server For React-----
// 'use strict';
// const express = require('express');
// const app = express();
// const path = require('path');
// const PORT = process.env.PORT || 3000;
// const router = express.Router();
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const config = require('../config/development.json')['passport'];
// const models = require('../db/models');
// const middleware = require('./middleware');
//
//
// app.listen(PORT, () => {
//   console.log(`BestFit is listening on port ${PORT}!`);
// });
//
// app.use(express.static(__dirname + '/../public/dist'));
//
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/../public/index.html'));
// });
//
// app.get('/auth/google',
//   middleware.passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
//
// app.get('/auth/google/callback', middleware.passport.authenticate('google', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/login'
// }));
//
// app.get('/dashboard', (req, res) => {
//   res.sendFile(path.join(__dirname, '/../public/index.html'));
// })
//
// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, '/../public/index.html'));
// })
//
// app.get('/trip', (req, res) => {
//   res.sendFile(path.join(__dirname, '/../public/index.html'));
// })
//
//
// passport.serializeUser((profile, done) => {
//   done(null, profile.id);
// });
//
// passport.deserializeUser((id, done) => {
//   return models.Profile.where({ id }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       done(null, profile.serialize());
//     })
//     .error(error => {
//       done(error, null);
//     })
//     .catch(() => {
//       done(null, null, { message: 'No user found' });
//     });
// });
//
// passport.use('google', new GoogleStrategy({
//   clientID: config.Google.clientID,
//   clientSecret: config.Google.clientSecret,
//   callbackURL: config.Google.callbackURL
// },
//   (accessToken, refreshToken, profile, done) => getOrCreateOAuthProfile('google', profile, done))
// );
//
// router.route('/logout')
//   .get((req, res) => {
//     req.logout();
//     res.redirect('/');
//   });
//
// const getOrCreateOAuthProfile = (type, oauthProfile, done) => {
//   console.log('hello');
//   return models.Auth.where({ type, oauth_id: oauthProfile.id }).fetch({
//     withRelated: ['profile']
//   })
//     .then(oauthAccount => {
//
//       if (oauthAccount) {
//         throw oauthAccount;
//       }
//
//       if (!oauthProfile.emails || !oauthProfile.emails.length) {
//         // FB users can register with a phone number, which is not exposed by Passport
//         throw null;
//       }
//       return models.Profile.where({ email: oauthProfile.emails[0].value }).fetch();
//     })
//     .then(profile => {
//
//       let profileInfo = {
//         first: oauthProfile.name.givenName,
//         last: oauthProfile.name.familyName,
//         display: oauthProfile.displayName || `${oauthProfile.name.givenName} ${oauthProfile.name.familyName}`,
//         email: oauthProfile.emails[0].value
//       };
//
//       if (profile) {
//         //update profile with info from oauth
//         return profile.save(profileInfo, { method: 'update' });
//       }
//       // otherwise create new profile
//       return models.Profile.forge(profileInfo).save();
//     })
//     .tap(profile => {
//       return models.Auth.forge({
//         type,
//         profile_id: profile.get('id'),
//         oauth_id: oauthProfile.id
//       }).save();
//     })
//     .error(err => {
//       done(err, null);
//     })
//     .catch(oauthAccount => {
//       if (!oauthAccount) {
//         throw oauthAccount;
//       }
//       return oauthAccount.related('profile');
//     })
//     .then(profile => {
//       if (profile) {
//         done(null, profile.serialize());
//       }
//     })
//     .catch(() => {
//       // TODO: This is not working because redirect to login uses req.flash('loginMessage')
//       // and there is no access to req here
//       done(null, null, {
//         'message': 'Signing up requires an email address, \
//           please be sure there is an email address associated with your Facebook account \
//           and grant access when you register.' });
//     });
// };
//
//
// module.exports = router;

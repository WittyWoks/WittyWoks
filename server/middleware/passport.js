'use strict';
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const models = require('../../db/models');
const Gmail = require('node-gmail-api');
var Base64 = require('js-base64').Base64;
var utf8 = require('utf8');


const G_ID = process.env.G_ID || require('../../config/development.json')['passport'].Google.clientID;
const G_SECRET = process.env.G_SECRET || require('../../config/development.json')['passport'].Google.clientSecret;
const G_URL = process.env.G_URL || 'http://localhost:3000/auth/google/callback';


passport.serializeUser((profile, done) => {
  done(null, profile.id);
});

passport.deserializeUser((id, done) => {
  return models.Profile.where({ id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      done(null, profile.serialize());
    })
    .error(error => {
      done(error, null);
    })
    .catch(() => {
      done(null, null, { message: 'No user found' });
    });
});

passport.use('google', new GoogleStrategy({
  clientID: G_ID,
  clientSecret: G_SECRET,
  callbackURL: G_URL
},
  (accessToken, refreshToken, profile, done) => {
    getOrCreateOAuthProfile('google', profile, done);

    // const gmail = new Gmail(accessToken);
    // const message = gmail.messages('label:inbox', {max: 3});

    // message.on('data', function (index) {
  // 
  //     if (index.payload.parts !== undefined) {
  //       let string = Base64.decode(index.payload.parts[0].body.data).toString();
  //       searchEmailsForApplies(string, profile, index);
  //     }
  //   })
  // })
);


const searchEmailsForApplies = (decodedBodyMessage, oauthProfile, email) => {
  let spacing = decodedBodyMessage.trim();
  let d = [];
  for (var i = 0; i < spacing.length; i++) {
    d.push(spacing[i]);
  }

  for (let i = 0; i < d.length; i++) {
    if (d[i] === '\r' || d[i] === '\n' || d[i] === '-') {
      d.splice(i, 1);
      i--;
    }
  }

  let bodyString = d.join('').toLowerCase();

  let lookUp = {
    'indeed': 100,
    'job': 100,
    'thank you for your interest': 500,
    'our team': 100,
    'recruiting': 100,
    'careers': 50,
    'we appreciate your interest': 500,
    'position': 100,
    'submission': 100,
    'employment': 100,
    'received your resume': 500,
    'application': 100
  };

  let ranking = 0;
  let matches = 0;

  for (let k in lookUp) {
    if (bodyString.includes(k)) {
      ranking += lookUp[k];
      matches++;
    }
  }

  if (matches > 2) {
    console.log('Applied Job');
  } else {
    console.log('Not an applied Job email');
  }
};

const saveEmail = (body, profile, emailDetail) => {

};

const getOrCreateOAuthProfile = (type, oauthProfile, done) => {
  console.log(oauthProfile);
  
  return models.Auth.where({ type, oauth_id: oauthProfile.id }).fetch({
    withRelated: ['profile']
  })
    .then(oauthAccount => {

      if (oauthAccount) {
        throw oauthAccount;
      }

      if (!oauthProfile.emails || !oauthProfile.emails.length) {

        // FB users can register with a phone number, which is not exposed by Passport
        throw null;
      }
      return models.Profile.where({ email: oauthProfile.emails[0].value }).fetch();
    })
    .then(profile => {
      let profileInfo = {
        first: oauthProfile.name.givenName,
        last: oauthProfile.name.familyName,
        display: oauthProfile.displayName || `${oauthProfile.name.givenName} ${oauthProfile.name.familyName}`,
        email: oauthProfile.emails[0].value,
        avatar: (oauthProfile.photos[0].value.split('?')[0] + '?sz=100')
      };

      if (profile) {
        //update profile with info from oauth
        return profile.save(profileInfo, { method: 'update' });
      }
      // otherwise create new profile
      return models.Profile.forge(profileInfo).save();
    })
    .tap(profile => {
      return models.Auth.forge({
        type,
        profile_id: profile.get('id'),
        oauth_id: oauthProfile.id
      }).save();
    })
    .error(err => {
      console.log('Error authenticating... see line 153 in passport.js', err);
      done(err, null);
    })
    .catch(oauthAccount => {
      if (!oauthAccount) {
        console.log('database login error');
        throw oauthAccount;
      }
      return oauthAccount.related('profile');
    })
    .then(profile => {
      if (profile) {
        done(null, profile.serialize());
      }
    })
    .catch(() => {
      // TODO: This is not working because redirect to login uses req.flash('loginMessage')
      // and there is no access to req here
      done(null, null, {
        'message': 'Signing up requires an email address, \
          please be sure there is an email address associated with your Facebook account \
          and grant access when you register.' });
    });
};

module.exports = passport;

'use strict';
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const models = require('../../db/models');


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
    profile.accessToken = accessToken;
    getOrCreateOAuthProfile('google', profile, done);


  })
);


const getOrCreateOAuthProfile = (type, oauthProfile, done) => {
  console.log(oauthProfile);

  return models.Auth.where({ type, oauth_id: oauthProfile.id }).fetch({
    withRelated: ['profile']
  })
    .then(oauthAccount => {

      if (oauthAccount) {

        let update = {
          token: oauthProfile.accessToken
        };

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
        avatar: (oauthProfile.photos[0].value.split('?')[0] + '?sz=100'),
        token: oauthProfile.accessToken
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
          console.log('in then profile!!!!!!', profile);

          if (profile.token !== oauthProfile.accessToken) {
             profile.save({token: oauthProfile.accessToken}, { method: 'update' });
          }
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

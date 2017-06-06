// const session = require('express-session');
// const RedisStore = require('connect-redis')(session);
// const redisClient = require('redis').createClient(process.env.REDISTOGO_URL);


// if (process.env.REDISTOGO_URL) {
//     // TODO: redistogo connection
//     let rtg   = require("url").parse(process.env.REDISTOGO_URL);
//     let redis = require("redis").createClient(rtg.port, rtg.hostname);

// redis.auth(rtg.auth.split(":")[1]);
// } else {
//     let redis = require("redis").createClient();
// }

// module.exports.verify = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/home');
// };

// module.exports.session = session({
//   store: new RedisStore({
//     client: redisClient || redisLocal,
//     host: 'localhost',
//     port: 6379
//   }),
//   secret: 'more laughter, more love, more life',
//   resave: false,
//   saveUninitialized: false
// });

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient();

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('THIS MEANS ITS VERIFIED... headed to Dashboard');
    return next();
  }
  console.log('...THIS MEANS ITS NOT VERIFIED... headed to Home');
  res.redirect('/home'); // IF NOT VERIFIED, GO HERE!
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: 'localhost',
    port: 6379
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});

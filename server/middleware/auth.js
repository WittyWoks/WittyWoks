const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient(process.env.REDIS_URL) || require('redis').createClient();

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('ID VERIFIED... headed to Dashboard');
    return next();
  }
  console.log('ID NOT VERIFIED... headed to Home');
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

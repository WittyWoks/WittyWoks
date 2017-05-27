const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient(process.env.REDISTOGO_URL);


if (process.env.REDISTOGO_URL) {
    // TODO: redistogo connection
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);

redis.auth(rtg.auth.split(":")[1]);
} else {
    var redis = require("redis").createClient();
}

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient || redisLocal,
    host: 'localhost',
    port: 6379
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});

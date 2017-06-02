'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const app = express();
app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public/dist')));


app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);

// JEE added routes
app.use('/', routes.api);
app.use('/home', routes.api);
app.use('/fileUpload', routes.api);

//AE added routes
app.use('/glassDoor', routes.api);
app.use('/indeed', routes.api);

//JC added routes
app.use('/user', routes.api);

module.exports = app;

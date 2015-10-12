var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var User = require('../models/user');
var init = require('./init');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

init();

module.exports = passport;

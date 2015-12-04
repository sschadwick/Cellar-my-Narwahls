'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var Item = require(__dirname + '/../models/item');
var User = require(__dirname + '/../models/user');
var eatauth = require(__dirname + '/../lib/eat_auth');
var httpBasic = require(__dirname + '/../lib/http_basic');
var handleError = require(__dirname + '/../lib/error_handler');
var responseHandler = require(__dirname + '/../lib/response_handler');

var usersRoute = module.exports = exports = express.Router();

usersRoute.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.basic = req.body;

  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) return handleError.err500(err, res);
    newUser.save(function(err, data) {
      if (err) return handleError.err500(err, res);
      newUser.generateToken(function(err, token) {
        if (err) return handleError.err500(err, res);
        res.json({token: token});
      });
    });
  });
});

usersRoute.get('/signin', httpBasic, function(req, res) {
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if (err) return handleError.err401(err, res);
    user.compareHash(req.auth.password, function(err, hashRes) {
      if (err) return handleError.err401(err, res);
      if (!hashRes) return handleError.err401(err, res);
      user.generateToken(function(err, token) {
        if (err) return handleError.err500(err, res);
        res.json({token: token});
      });
    });
  });
});

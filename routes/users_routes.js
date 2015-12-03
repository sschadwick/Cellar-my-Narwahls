'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var Item = require(__dirname + '/../models/item');
var handleError = require(__dirname + '/../lib/error_handler');
var responseHandler = require(__dirname + '/../lib/response_handler');

var usersRoute = module.exports = exports = express.Router();

usersRoute.post('/signup', function(req, res) {

});

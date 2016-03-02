'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var Item = require(__dirname + '/../models/item');
var User = require(__dirname + '/../models/user');

var handleError = require(__dirname + '/../lib/error_handler');
var responseHandler = require(__dirname + '/../lib/response_handler');
var eatauth = require(__dirname + '/../lib/eat_auth');
var httpBasic = require(__dirname + '/../lib/http_basic');

var itemsRoute = module.exports = exports = express.Router();

itemsRoute.get('/items', eatauth, function(req, res) {
  User.findOne({username: req.user.username}, {items: 1}, function(err, items) {
    if (err) return handleError.err500(err, res);
    responseHandler.send200(res, items);
  });
});

/*
Adding an item:
Check if item is currently in system, if so then add a pointer to item in users inventory.
If item isn't in system yet, then create a new item in the item db.
*/

// Create new item in db (prepolulated by front-end)
itemsRoute.post('/create', jsonParser, eatauth, function(req, res) {
  var item = req.body;
  var newItem = new Item(item);
  newItem.save(function(err, data) {
    if (err) return handleError.err500(err, res);
    responseHandler.send201(res, data);
  });
});

// Add new item to user inventory
itemsRoute.post('/items', jsonParser, eatauth, function(req, res) {
  User.findOne({username: req.user.username}, {items: 1}, function(err, user) {
    if (!user.items) {user.items = [];}
    user.items.push(req.body);
    user.save(function(err, data) {
      if (err) return handleError.err500(err, res);
      responseHandler.send201(res, data);
    });
  });
});

itemsRoute.put('/items/:id', jsonParser, eatauth, function(req, res) {
  User.findOne({username: req.user.username}, {items: 1}, function(err, user) {
    for (var i in user.items) {
      if (user.items[i].itemID == req.params.id) {
        user.items[i].qty = req.body.qty;
        user.save();
        responseHandler.send201(res, user);
      }
    }
  });
});

// Delete could remove the item from the users inventory completely
itemsRoute.delete('/items/:id', jsonParser, eatauth, function(req, res) {
  Item.remove({_id: req.params.id}, function(err) {
    if (err) return handleError.err500(err, res);
    responseHandler.send200(res, 'deleted');
  });
});

'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var Item = require(__dirname + '/../models/item');
var handleError = require(__dirname + '/../lib/error_handler');
var responseHandler = require(__dirname + '/../lib/response_handler');
var eatauth = require(__dirname + '/../lib/eat_auth');
var httpBasic = require(__dirname + '/../lib/http_basic');

var itemsRoute = module.exports = exports = express.Router();

itemsRoute.get('/items', eatauth, function(req, res) {
  Item.find({owner: req.user.username}, function(err, items) {
    if (err) return handleError.err500(err, res);
    responseHandler.send200(res, items);
  });
});

itemsRoute.post('/items', jsonParser, eatauth, function(req, res) {
  var item = {};
  item.owner = req.user.username || 'Anonymous';
  item.itemName = req.body.itemName;
  item.vintage = req.body.vintage;
  item.quantity = req.body.quantity;
  var newItem = new Item(item);
  newItem.save(function(err, data) {
    if (err) return handleError.err500(err, res);
    responseHandler.send201(res, data);
  });
});

itemsRoute.put('/items/:id', jsonParser, eatauth, function(req, res) {
  var updateItem = req.body;
  delete updateItem._id;

  Item.update({_id: req.params.id}, updateItem, function(err, data) {
    if (err) return handleError.err500(err, res);
    res.json({msg: data});
  });
});

itemsRoute.delete('/items/:id', jsonParser, eatauth, function(req, res) {
  Item.remove({_id: req.params.id}, function(err) {
    if (err) return handleError.err500(err, res);
    responseHandler.send200(res, 'deleted');
  });
});

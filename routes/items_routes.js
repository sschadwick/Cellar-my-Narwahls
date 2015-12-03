'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var Item = require(__dirname + '/../models/item');
var handleError = require(__dirname + '/../lib/error_handler');
var responseHandler = require(__dirname + '/../lib/response_handler');

var itemsRoute = module.exports = exports = express.Router();

itemsRoute.get('/items', function(req, res) {
  Item.find({}, function(err, items) {
    if (err) return handleError(err, res);
    responseHandler.send200(res, items);
  });
});

itemsRoute.post('/items', jsonParser, function(req, res) {
  var item = {};
  item.itemName = req.body.itemName;
  item.vintage = req.body.vintage;
  item.quantity = req.body.quantity;
  var newItem = new Item(item);
  newItem.save(function(err, data) {
    responseHandler.send201(res, data);
  });
});

itemsRoute.patch('/items/:id', jsonParser, function(req, res) {
  //update an existing item (eg change quantity)
});

itemsRoute.delete('/items/:id', jsonParser, function(req, res) {
  Item.remove({_id: req.params.id}, function(err) {
    if (err) return handleError.err500(err, res);
    responseHandler.send200(res, 'deleted');
  });
});
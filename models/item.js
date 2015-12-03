var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  itemName: String,
  vintage: String,
  quantity: Number,
  upc: String,
  owner: String
});

module.exports = mongoose.model('Item', itemSchema);

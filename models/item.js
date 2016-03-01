var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  itemName: String,
  vintage: String,
  upc: String,
  style: String,
  description: String,
  picture: Object
});

module.exports = mongoose.model('Item', itemSchema);

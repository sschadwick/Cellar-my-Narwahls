var mongoose = require('mongoose');

// TODO remove quantit?y and owner. Need to incorporate commerical API calls
// add picture of item?
// user will have pointers to these items

var itemSchema = new mongoose.Schema({
  itemName: String,
  vintage: String,
  quantity: Number,
  upc: String,
  owner: String
});

module.exports = mongoose.model('Item', itemSchema);

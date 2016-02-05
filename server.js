'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/cellar_my_narwahls');
process.env.APP_SECRET = process.env.APP_SECRET || 'needtochangethis';

var itemsRouter = require(__dirname + '/routes/items_routes');
var usersRouter = require(__dirname + '/routes/users_routes');

app.use(express.static(__dirname + '/build'));
app.use('/cellar/', itemsRouter);
app.use('/cellar/', usersRouter);

app.use(function(req, res) {
  res.status(404).send('Page not found');
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('server is running on ' + port);
});

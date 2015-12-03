var chai = require('chai');
var http = require('chai-http');
chai.use(http);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/user_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
var serverURL = 'http://localhost:3000';

describe('users', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  
  it('should signup a new user');
  it('should signin an existing user');
  it('should signout a user');
});

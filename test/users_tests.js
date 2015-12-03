var chai = require('chai');
var http = require('chai-http');
chai.use(http);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/user_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
var eatauth = require(__dirname + '/../lib/eat_auth');
var httpBasic = require(__dirname + '/../lib/http_basic');
var serverURL = 'http://localhost:3000/cellar';

describe('http basic: header authorization', function() {
  it('should be able to handle http basic auth', function() {
    var req = {
      headers: {
        authorization: 'Basic ' + (new Buffer('testuser1:foobar123')).toString('base64')
      }
    };

    httpBasic(req, {}, function() {
      expect(typeof req.auth).to.eql('object');
      expect(req.auth.username).to.eql('testuser1');
      expect(req.auth.password).to.eql('foobar123');
    });
  });
});

describe('auth', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create a new user', function(done) {
    chai.request(serverURL)
    .post('/signup')
    .send({username: 'testuser1', password: 'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.token.length).to.be.above(0);
      done();
    });
  });

  it('should signin an existing user');
  it('should signout a user');
});

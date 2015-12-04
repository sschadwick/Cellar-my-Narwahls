var chai = require('chai');
var http = require('chai-http');
chai.use(http);
var expect = chai.expect;

var mongoose = require('mongoose');
process.env.MONGO_URL = 'mongodb://localhost/item_test';
require(__dirname + '/../server');
var serverURL = 'http://localhost:3000/cellar';
var Item = require(__dirname + '/../models/item');
var User = require(__dirname + '/../models/user');

describe('items', function() {
  var dummyItem;
  before(function(done) {
    var testItem = new Item({
      itemName: 'Michelob',
      vintage: '10 days',
      quantity: 2
    });
    testItem.save(function(err, data) {
      dummyItem = data._id;
    });

    var user = new User();
    user.username = 'test';
    user.basic.username = 'test';
    user.generateHash('foobar123', function(err, res) {
      if (err) throw err;
      user.save(function(err, data) {
        if (err) throw err;
        user.generateToken(function(err, token) {
          if (err) throw err;
          this.token = token;
          done();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  });

  it('should be able to get a list of all items', function(done) {
    chai.request(serverURL)
    .get('/items')
    .set({token: this.token})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body.msg).to.eql('object');
      done();
    });
  });

  it('should be able to add an item', function(done) {
    chai.request(serverURL)
    .post('/items')
    .set({token: this.token})
    .send({
      itemName: 'Bourbon County',
      vintage: '2014',
      quantity: 4
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg.vintage).to.eql('2014');
      done();
    });
  });

  it('should be able to update an item', function(done) {
    chai.request(serverURL)
    .put('/items/' + dummyItem)
    .set({token: this.token})
    .send({
      itemName: 'Michelob',
      vintage: '10 days',
      quantity: 12
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      console.log(res.body);
      expect(res.body.msg.ok).to.eql(1);
      done();
    });
  });

  it('should be able to remove an item', function(done) {
    chai.request(serverURL)
    .delete('/items/' + dummyItem)
    .set({token: this.token})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('deleted');
      done();
    });
  });

});

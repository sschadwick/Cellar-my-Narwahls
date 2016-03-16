var chai = require('chai');
var http = require('chai-http');
chai.use(http);
var expect = chai.expect;

var mongoose = require('mongoose');
process.env.MONGO_URL = 'mongodb://localhost/item_test';
require(__dirname + '/../../server');
var serverURL = 'http://localhost:3000/cellar';
var Item = require(__dirname + '/../../models/item');
var User = require(__dirname + '/../../models/user');

describe('items', function() {
  before(function(done) {
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

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  it('should be able to get a list of all users items', function(done) {
    chai.request(serverURL)
    .get('/items')
    .set({token: this.token})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body.msg).to.eql('object');
      done();
    });
  });

  it('should be able to create a new item in Item DB', function(done) {
    chai.request(serverURL)
    .post('/create')
    .set({token: this.token})
    .send({
      itemName: 'Bourbon County',
      vintage: '2014'
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg.vintage).to.eql('2014');
      done();
    });
  });

  it ('should be able to add an item to User inventory', function(done) {
    chai.request(serverURL)
    .post('/items')
    .set({token: this.token})
    .send({
      itemID: 12345,
      qty: 4
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg[0].qty).to.eql(4);
      done();
    });
  });

  it('should be able to update an item quantity in User inventory', function(done) {
    chai.request(serverURL)
    .put('/items/' + 12345)
    .set({token: this.token})
    .send({
      qty: 20
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg.qty).to.eql(20);
      done();
    });
  });

  it('should be able to remove an item completely from User inventory', function(done) {
    chai.request(serverURL)
    .delete('/items/' + 12345)
    .set({token: this.token})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('deleted');
      done();
    });
  });
});

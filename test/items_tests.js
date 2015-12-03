var chai = require('chai');
var http = require('chai-http');
chai.use(http);
var expect = chai.expect;
var serverURL = 'http://localhost:3000/cellar';
var Item = require(__dirname + '/../models/item');

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
      done();
    });
  });

  it('should be able to get a list of all items', function(done) {
    chai.request(serverURL)
    .get('/items')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body.msg).to.eql('object');
      done();
    });
  });

  it('should be able to add an item', function(done) {
    chai.request(serverURL)
    .post('/items')
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
    .send({
      itemName: 'Michelob',
      vintage: '10 days',
      quantity: 12
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg.nModified).to.eql(1);
      done();
    });
  });
  
  it('should be able to remove an item', function(done) {
    chai.request(serverURL)
    .delete('/items/' + dummyItem)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('deleted');
      done();
    });
  });

});

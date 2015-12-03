var chai = require('chai');
var http = require('chai-http');
chai.use(http);
var expect = chai.expect;
var serverURL = 'http://localhost:3000/cellar';

describe('items', function() {

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
      vintage: 2014,
      quantity: 4
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg.vintage).to.eql('2014');
      done();
    });
  });

  it('should be able to update an item');
  
  it('should be able to remove an item');
});

require('../../app/js/client');

describe('resource service', function() {
  beforeEach(angular.mock.module('cellarApp'));

  var ResourceService;
  var $httpBackend;
  var cellarResource;

  beforeEach(angular.mock.inject(function(Resource, _$httpBackend_) {
    ResourceService = Resource;
    $httpBackend = _$httpBackend_;
    cellarResource = ResourceService('cellar');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a GET request', function() {
    $httpBackend.expectGET('/cellar/items').respond(200, [{itemName: 'Test brew', vintage: '1980', quantity: 1}]);
    cellarResource.getAll(function(err, data) {
      expect(err).toBe(null);
      expect(Array.isArray(data)).toBe(true);
    });
    $httpBackend.flush();
  });

});

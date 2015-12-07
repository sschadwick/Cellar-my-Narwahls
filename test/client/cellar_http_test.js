require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('cellar controller', function() {
  var $httpBackend;
  var ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('cellarApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should create a new controller', function() {
    var controller = new $ControllerConstructor('CellarController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.cellar)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('CellarController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request when getAll() is called', function() {
      $httpBackend.expectGET('/cellar/items').respond(200, [{itemName: 'Wasser'}]);
      $scope.getAll();
      $httpBackend.flush();
      console.log($scope.cellar);
      expect($scope.cellar[0].itemName).toBe('Wasser');
    });

    //create a new item

    //update a current item

    //delete an item

  });
});

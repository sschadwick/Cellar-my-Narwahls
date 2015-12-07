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
      expect($scope.cellar[0].itemName).toBe('Wasser');
    });

    it('should create a new item', function() {
      $httpBackend.expectPOST('/cellar/items').respond(200, {itemName: 'Brr', quantity: 2});
      $scope.createItem({itemName: 'Brr'});
      $httpBackend.flush();
      expect($scope.cellar[0].itemName).toBe('Brr');
    });

    it('should update an item', function() {
      $scope.cellar.push({itemName: 'Update dis', _id: 1, quantity: 4});
      var dummyItem = {_id: 1, quantity: 50, editing: true};
      $httpBackend.expectPUT('/cellar/items/1', dummyItem).respond(200);
      $scope.updateItem(dummyItem);
      $httpBackend.flush();
      console.log($scope.cellar);
      expect($scope.cellar[0].itemName).toBe('Update dis');
      expect($scope.cellar[0].quantity).toBe(50);
      expect(dummyItem.editing).toBe(false);
    });

    it('should delete an item', function() {
      $httpBackend.expectDELETE('/cellar/items/1').respond(200);
      var dummyItem = {itemName: 'Delete Me', _id: 1};
      $scope.cellar.push(dummyItem);
      $scope.removeItem(dummyItem);
      $httpBackend.flush();
      expect($scope.cellar.length).toBe(0);
      expect($scope.cellar.indexOf(dummyItem)).toBe(-1);
    });

  });
});

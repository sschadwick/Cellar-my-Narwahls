module.exports = function(app) {
  app.controller('CellarController', ['$scope', 'Resource', '$http', '$cookies', '$location', function($scope, Resource, $http, $cookies, $location) {
    var eat = $cookies.get('eat');
    if (!(eat && eat.length)) {
      $location.path('/signin');
    }

    $http.defaults.headers.common.token = eat;

    $scope.cellar = [];
    $scope.newItem = {};
    var cellarResource = Resource('items');

    $scope.description = 'Manage your beer or wine cellar for much the win';

    $scope.printDescription = function(description) {
      console.log('from the function: ' + description);
      console.log('from $scope: ' + $scope.description);
    };

    $scope.getAll = function() {
      cellarResource.getAll(function(err, data) {
        if (err) {return console.log(err);}
        $scope.cellar = data;
      });
    };

    $scope.createItem = function(item) {
      cellarResource.create(item, function(err, data) {
        if (err) {return console.log(err);}
        $scope.newItem = {};
        $scope.cellar.push(data);
      });
    };

    $scope.updateItem = function(item) {
      cellarResource.update(item, function(err) {
        if (err) {return console.log(err);}
        item.editing = false;
      });
    };

    $scope.editItem = function(item) {
      item.storeItemName = item.itemName;
      item.storeVintage = item.vintage;
      item.storeQuantity = item.quantity;
      item.storeUpc = item.upc;
      item.editing = true;
    };

    $scope.cancelEdit = function(item) {
      item.itemName = item.storeItemName;
      item.vintage = item.storeVintage;
      item.quantity = item.storeQuantity;
      item.upc = item.storeUpc;
      item.editing = false;
    };

    $scope.removeItem = function(item) {
      cellarResource.remove(item, function(err) {
        if (err) {return console.log(err);}
        $scope.cellar.splice($scope.cellar.indexOf(item), 1);
      });
    };

  }]);
};

var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  };
};

var handleFailure = function(callback) {
  return function(data) {
    callback(data);
  };
};

module.exports = function(app) {
  app.factory('Resource', ['$http', function($http) {
    var Resource = function(resourceName) {
      this.resourceName = resourceName;
    };

    Resource.prototype.getAll = function(callback) {
      $http.get('/cellar/' + this.resourceName)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.create = function(resource, callback) {
      $http.post('/cellar/create', resource)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.add = function(resource, callback) {
      $http.post('/cellar/' + this.resourceName, resource)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.update = function(resource, callback) {
      $http.put('/cellar/' + this.resourceName + '/' + resource._id, resource)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.remove = function(resource, callback) {
      $http.delete('/cellar/' + this.resourceName + '/' + resource._id)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    return function(resourceName) {
      return new Resource(resourceName);
    };
  }]);
};

module.exports = function(cellarApp) {
  cellarApp.config(['$routeProvider', function($route) {
    $route
      .when('/cellar', {
        templateUrl: 'templates/cellar/views/cellar_view.html'
      })
      .when('/signup', {
        templateUrl: 'templates/cellar/views/signupin_view.html',
        controller: 'SignupController'
      })
      .when('/signin', {
        templateUrl: 'templates/cellar/views/signupin_view.html',
        contorller: 'SigninController'
      })
      .otherwise({
        redirectTo: '/signin'
      });
  }]);
};

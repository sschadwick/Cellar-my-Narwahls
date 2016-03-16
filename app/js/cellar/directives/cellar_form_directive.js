module.exports = function(app) {
  app.directive('cellarForm', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/cellar/directives/cellar_form_template.html',
      scope: {
        labelText: '@',
        buttonText: '@',
        review: '=',
        save: '&'
      },
      controller: function($scope) {
        console.log($scope.save);
      }
    };
  });
};

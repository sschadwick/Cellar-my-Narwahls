require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');
var angular = window.angular;

var cellarApp = angular.module('cellarApp', ['ngRoute', 'base64', 'ngCookies']);

require('./services/services')(cellarApp);
require('./cellar/cellar')(cellarApp);
require('./users/users')(cellarApp);
require('./logout')(cellarApp);
require('./router')(cellarApp);

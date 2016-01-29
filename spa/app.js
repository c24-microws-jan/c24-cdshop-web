'use strict';

var cdApp = angular.module('cdapp', []);
  
cdApp .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/list', {
        templateUrl: 'templates/list.html',
        controller: 'ListController'
      }).
      otherwise({
        redirectTo: '/list'
      });
  }]);

cdApp.controller('ListController', function($scope) {
     
});